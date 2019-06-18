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
        tweet['topics'] = Object.assign({}, tweet.$channels)
        tweet['keywords'] = [...tweet.$keywords]
        if (tweet.extended_tweet)
            tweet.text = tweet.extended_tweet.full_text
        tweet.text = preprocess(tweet.text)[0]

        // Analyze the tweet (NLP PART)
        tweet['analysis'] = await nlp.analyzeText(tweet.text)

        // Predict the labels
        tweet['labels'] = await ml.analyzeTweet(tweet)

        // Save the tweet --- pass it to Bakjs for saving
        axios.post(config.get('bakjs').saveTweet, {tweet: tweet})
            .then(response => {
              that.storeData(tweet)
            })
            .catch(err => {
                console.log('error:', err);
                return false
            });
    }

    async storeData(tweet) {
      this.temp.push(tweet)
      if (this.temp.length > 20){
        await axios.get(config.get('bakjs').getAggregateData)
          .then(response => {
            main.socket.emit('bulk-update', {
              tweets: this.temp,
              aggregate: response.data
            })
            console.log('DONE!')
          })
          .catch(err => {
            console.log('error:', err);
            return false
          })
        this.temp = []
      }
    }

}

module.exports = TwitterConsumer
