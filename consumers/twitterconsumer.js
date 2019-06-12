const BaseConsumer = require('./baseconsumer')
const { preprocess } = require('../modules/preprocessors')
const axios = require('axios')
const nlp = require('../modules/nlp')
const ml = require('../modules/mldrivers')
const config = require('config')
const channels = config.get('channels')

let main = require('../main')
let TwitterStreamChannels = require('twitter-stream-channels')
let T = new TwitterStreamChannels(config.get('twit'))

class TwitterConsumer extends BaseConsumer {

    constructor() {
      super()
      this.channels = {}
      const that = this
      Object.keys(channels).map(function(key, index) {
        that.channels[key] = channels[key].keywords
      });
    }

    consume() {
        if (this.stream)
            this.stream.start()
        else
            this.stream = T.streamChannels({track: this.channels, language: 'en'})
                .on('channels', tweet => this.handleTweet(tweet))
        return this.stream
    }

    pauseConsuming() {
        if (this.stream)
            this.stream.stop()
        return true
    }

    async handleTweet(tweet) {
        const that = this
        // Pre-process the tweet
        tweet['cause_factors'] = Object.assign({}, tweet.$channels)
        if (tweet.extended_tweet)
            tweet.text = tweet.extended_tweet.full_text
        tweet.text = preprocess(tweet.text)[0]

        // Analyze the tweet (NLP PART)
        tweet['analysis'] = await nlp.analyzeText(tweet.text)

        // Predict the labels
        tweet['labels'] = await ml.analyzeTweet(tweet)

        main.socket.emit('tweet', {data: tweet})
        // Save the tweet --- pass it to Bakjs for saving
        axios.post(config.get('bakjs'), {tweet: tweet})
            .then(response => {
                that.storeTweet(tweet)
            })
            .catch(err => {
                console.log('error:', err);
            });
    }

    storeTweet(tweet) {
      // Stupid code
      main.socket.emit('tweet', {data: tweet})
      // this.temp.push(tweet)
      // if (this.temp.length > 50){
      //   main.socket.emit('tweet-bulk', {data: this.temp})
      //   this.temp = []
      // }
    }

}

module.exports = TwitterConsumer
