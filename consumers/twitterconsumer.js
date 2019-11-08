const BaseConsumer = require('./baseconsumer')
const { preprocess } = require('../modules/preprocessors')
const axios = require('axios')
const nlp = require('../modules/nlp')
const ml = require('../modules/mldrivers')
const config = require('config')
const channels = config.get('channels')
const logger = require('../plugins/log')

// let main = require('../main')
let TwitterStreamChannels = require('twitter-stream-channels')
let T = new TwitterStreamChannels(config.get('twit'))

class TwitterConsumer extends BaseConsumer {

    constructor(socket) {
      super(socket)
      this.channels = {}
      const that = this
      Object.keys(channels).map(function(key, index) {
        that.channels[key] = channels[key].keywords
      });
    }

    routes () {
      this.socket.on('update_topics', data => { this.updateTopics(data) })
      this.socket.on('topics_request', data => { this.ackTopics(data) })
    }

    consume(channels) {
        if (!channels)
          channels = this.channels
        this.stream = T.streamChannels({track: channels, language: 'en'})
          .on('channels', tweet => this.handleTweet(tweet))
        logger.info('Consuming twitter feed has started...')
        return this.stream
    }

    pauseConsuming() {
        if (this.stream)
            this.stream.stop()
        logger.info('Consuming twitter feed has stopped')
        return true
    }

    updateTopics(data) {
      this.pauseConsuming()
      console.log('heeeeeeeeeeeeeeeeeey! STOPPPPP!')
      console.log(data)
      if (Object.keys(data).length > 0)
        this.consume(data)
    }

    ackTopics(data) {
      console.log('Client connected!!')
      this.socket.emit('topics_response', this.channels)
    }

    async handleTweet(tweet) {
        console.log(tweet.text)
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
                logger.error('error:', err);
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
            logger.error('error:', err);
            return false
          })

        // Get Aggregated Topics from bakjs
        const aggregateTopics = await axios.get(config.get('bakjs').getAggregateTopics)
          .then(response => {
            return response.data
          })
          .catch(err => {
            logger.error('error:', err);
            return false
          })

        // Get Aggregated Keywords from bakjs
        const aggregateKeywords = await axios.get(config.get('bakjs').getAggregateKeywords)
          .then(response => {
            return response.data
          })
          .catch(err => {
            logger.error('error:', err);
            return false
          })

        // Emit the results to clients
        this.socket.emit('bulk-update', {
          topics: channels,
          aggregatedTopics: aggregateTopics,
          aggregatedUsers: aggregateUsers,
          aggregatedKeywords: aggregateKeywords
        })

        // Emit the results to clients
        this.socket.emit('tweets', {
          tweets: this.temp
        })

        // Empty temp storage
        this.temp = []
      }
    }

}

class Singleton {
  constructor(socket) {
    if (!Singleton.instance) {
      Singleton.instance = new TwitterConsumer(socket)
    }
    Singleton.instance.socket = socket
  }

  getInstance() {
    return Singleton.instance
  }
}

module.exports = Singleton
