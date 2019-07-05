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
        // Discard the tweet if it does not include any keywords
        if (Object.keys(tweet.$channels).length === 0) return

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
              that.submitData(tweet)
            })
            .catch(err => {
                console.log('error:', err);
                return false
            });
    }

    async submitData(tweet) {
      // Store tweet temporarily
      this.temp.push(tweet)

      // Limit is now 20
      if (this.temp.length > 20){
        // Get Aggregated Users from bakjs
        const aggregateUsers = await axios.get(config.get('bakjs').getAggregateUsers)
          .then(response => {
            return response.data.user_groups
          })
          .catch(err => {
            console.log('error:', err);
            return false
          })

        // Get Aggregated Topics from bakjs
        const aggregateTopics = await axios.get(config.get('bakjs').getAggregateTopics)
          .then(response => {
            return response.data
          })
          .catch(err => {
            console.log('error:', err);
            return false
          })

        // Get Aggregated Keywords from bakjs
        const aggregateKeywords = await axios.get(config.get('bakjs').getAggregateKeywords)
          .then(response => {
            return response.data
          })
          .catch(err => {
            console.log('error:', err);
            return false
          })

        // Emit the results to clients
        main.socket.emit('bulk-update', {
          topics: channels,
          aggregatedTopics: aggregateTopics,
          aggregatedUsers: aggregateUsers,
          aggregatedKeywords: aggregateKeywords
        })

        // Empty temp storage
        this.temp = []
      }
    }

}

module.exports = TwitterConsumer
