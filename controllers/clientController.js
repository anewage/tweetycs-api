const EventController = require('./controller')
const config = require('config')
const keywords = config.get('keywords')
let Twit = require('twit')
let T = new Twit(config.get('twit'))
/**
 * Generic Controller
 */
class ClientController extends EventController {

    constructor(socket) {
        super(socket);
        this.fetching = false
        this.stream = null
    }

    /**
     * Routes that the controller responds to
     */
    routes () {
        this.socket.on('client_event', data => { this.testMessage(data) })
        this.socket.on('client_broadcast_event', data => { this.testBroadcastMessage(data) })
        this.socket.on('client_room_event', data => { this.sendRoomMessage(data) })

        this.socket.on('fetch_stream', data => { this.fetchStream(data) })
        this.socket.on('stop_fetch', data => { this.stopFetching(data) })
    }

    testMessage(message) {
        this.socket.emit('server_response', {data: message.data})
    }

    testBroadcastMessage(message) {
        this.socket.broadcast.emit('server_response', {data: message.data})
        console.log('BROADCAST: ', message.data )
    }

    sendRoomMessage(message) {
        this.socket.to(message.room).emit('server_response', {data: message.data})
    }

    fetchStream(data) {
        console.log("hello!")
        if (this.fetching){
            this.socket.emit('server_response', {data: 'Error! Already fetching the stream...'})
            return
        }
        try {
            this.fetching = true
            if (this.stream)
                this.stream.start()
            else
                this.stream = T.stream('statuses/filter', {track: keywords, language: 'en'})
                    .on('tweet', tweet => this.processTweet(tweet))
            this.socket.emit('server_response', {data: 'Fetch started...'})
        } catch (e) {
            this.fetching = false
            this.socket.emit('server_response', {data: 'Error! Something is wrong with the server...'})
        }
    }

    stopFetching() {
        if (!this.fetching){
            this.socket.emit('server_response', {data: 'Error! Currently, no stream is being fetched.'})
            return
        }
        this.stream.stop()
        this.fetching = false
        this.socket.emit('server_response', {data: 'Fetch stopped.'})
    }

    async processTweet(tweet) {
        // Pre-process the tweet using the Flask deployment
        // tweet.text = PreProcessor.preprocessText(tweet.text)
        console.log(tweet.text)
        // tweet.text = await axios.post('http://localhost:5000/preprocess/', {
        //     tweet: tweet.text
        // }).then(function (response){
        //     return response.data
        // })

        // Analyze the tweet (NLP PART)
        // TODO: discard non-english tweets
        // let result = await nlp.analyzeText(tweet.text)
        // tweet['analysis'] = result
        // // Save the tweet --- pass it to Bakjs for saving
        // axios.post('http://localhost:3000/api/tweet/save', {tweet: tweet})
        //     .then(response => {
        //         this.emit('server_response', {data: 'Tweet: ' + tweet.text})
        //     })
        //     .catch(err => {
        //         console.log('error:');
        //     });
    }


}

module.exports = ClientController
