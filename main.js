const { PreProcessor } = require('./modules')
const axios = require('axios')
const { Tweet } = require('./models')
const config = require('config')
const nlp = require('./modules/nlp')
const routeRegistrar = require('./modules/routeregistrar')
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
const nameSpace = io.of('/test').on('connection', routeRegistrar)

// `this` refers to the socket
function pingPong(data) {
    this.emit('server_pong')
}

function testConnect(data) {
    console.log('Client connected!!')
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
    tweet.text = PreProcessor.preprocessText(tweet.text)
    console.log(tweet.text)
    // tweet.text = await axios.post('http://localhost:5000/preprocess/', {
    //     tweet: tweet.text
    // }).then(function (response){
    //     return response.data
    // })

    // Analyze the tweet (NLP PART)
    // TODO: discard non-english tweets
    let result = await nlp.analyzeText(tweet.text)
    tweet['analysis'] = result
    // Save the tweet --- pass it to Bakjs for saving
    axios.post('http://localhost:3000/api/tweet/save', {tweet: tweet})
        .then(response => {
            this.emit('server_response', {data: 'Tweet: ' + tweet.text})
        })
        .catch(err => {
            console.log('error:');
        });
}

