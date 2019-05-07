const axios = require('axios')
const { Tweet } = require('./models')
const config = require('config')
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-04-02',
    iam_apikey: config.IBM.api_key,
    url: config.IBM.url,
});
var Twit = require('twit')
var T = new Twit(config.get('twit'))
var keywords = config.get('keywords')
var fs = require('fs');
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fetching = false;
var stream = null;
app.listen(2000);
function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}
const nameSpace = io.of('/test').on('connection', (socket) => {
    socket.emit('server_response', {data: 'Connected', 'count': 0})
    socket.on('client_ping', data => pingPong.call(socket, data))
    socket.on('connect', data => testConnect.call(socket, data))
    socket.on('disconnect_request', data => disconnectRequest.call(socket, data))
    socket.on('disconnect', data => testDisconnect.call(socket, data))
    socket.on('client_event', data => testMessage.call(socket, data))
    socket.on('client_broadcast_event', data => testBroadcastMessage.call(socket, data))
    socket.on('client_room_event', data => sendRoomMessage.call(socket, data))
    socket.on('join', data => join.call(socket, data))
    socket.on('leave', data => leave.call(socket, data))
    socket.on('fetch_stream', data => fetchStream.call(socket, data))
    socket.on('stop_fetch', data => stopFetching.call(socket, data))
})

// `this` refers to the socket
function pingPong(data) {
    this.emit('server_pong')
}

function testConnect(data) {
    this.emit('server_response', {data: 'Connected', 'count': 0})
}

function testDisconnect(data) {
    console.log('Client disconnected!')
}

function disconnectRequest(data) {
    this.emit('server_response', {data: 'Disconnected!'})
    this.disconnect(true)
}

function sendRoomMessage(message) {
    this.to(message.room).emit('server_response', {data: message.data})
}

function testMessage(message) {
    this.emit('server_response', {data: message.data})
}

function testBroadcastMessage(message) {
    this.broadcast.emit('server_response', {data: message.data})
    console.log('BROADCAST: ', message.data )
}

function join(message) {
    this.join(message.room, data => {
        let rooms = Object.keys(this.rooms);
        // broadcast to everyone in the room
        this.to(message.room).emit('server_response', {data: 'a new user has joined the room'});
        this.emit('server_response', {data: 'In rooms: ' + rooms , rooms: rooms})
    })
}

function leave(message) {
    this.leave(message.room, data => {
        let rooms = Object.keys(this.rooms);
        // broadcast to everyone in the room
        this.to(message.room).emit('server_response', {data: 'a user has left the room'});
        this.emit('server_response', {data: 'In rooms: ' + rooms , rooms: rooms})
    })
}

function fetchStream() {
    if (fetching){
        this.emit('server_response', {data: 'Error! Already fetching the stream...'})
        return
    }
    fetching = true
    if (stream)
        stream.start()
    else
        stream = T.stream('statuses/filter', {track: keywords, language: 'en'}).on('tweet', tweet => processTweet.call(this, tweet))
    this.emit('server_response', {data: 'Fetch started...'})
}

function stopFetching() {
    if (!fetching){
        this.emit('server_response', {data: 'Error! Currently, no stream is being fetched.'})
        return
    }
    stream.stop()
    fetching = false
    this.emit('server_response', {data: 'Fetch stopped.'})
}

async function processTweet(tweet) {
    // Pre-process the tweet using the Flask deployment
    tweet.text = await axios.post('http://localhost:5000/preprocess/', {
        tweet: tweet.text
    }).then(function (response){
        return response.data
    })
    // Analyze the tweet (NLP PART)
    // TODO: discard non-english tweets
    const analyzeParams = {
        text: tweet.text,
        features: {
            concepts: {
                limit: 3
            },
            emotion: {
                targets: [
                    'disease',
                    'health',
                    'mortality'
                ]
            },
            entities: {
                emotion: true,
                sentiment: true,
                limit: 2,
            },
            keywords: {
                emotion: true,
                sentiment: true,
                limit: 3,
            },
            semantic_roles: {
                limit: 10,
                keywords: true,
                entities: true
            },
            sentiment: {
                targets: [
                    'disease',
                    'health',
                    'mortality'
                ]
            },
        },
    };
    tweet.analysis = await naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return analysisResults
        })
        .catch(err => {
            console.log('error:', err);
        });
    // Save the tweet --- pass it to Bakjs for saving
    axios.post('http://localhost:3000/api/tweet/save', {tweet: tweet})
        .then(response => {
            this.emit('server_response', {data: 'Tweet: ' + tweet.text})
        })
        .catch(err => {
            console.log('error:');
        });
}

