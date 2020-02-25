const BaseConsumer = require('./baseconsumer')
const { preprocess } = require('../modules/preprocessors')
const axios = require('axios')
const nlp = require('../modules/nlp')
const ml = require('../modules/mldrivers')
const config = require('config')
// const channels = config.get('channels')
const logger = require('../plugins/log')

// let main = require('../main')
let TwitterStreamChannels = require('twitter-stream-channels')
let T = new TwitterStreamChannels(config.get('twit'))

class TwitterConsumer extends BaseConsumer {

    constructor(socket) {
      super(socket)
      this.channels = {}
    }

    routes () {
      this.socket.on('update_channels', data => { this.updateChannels(data) })
      this.socket.on('pause_consuming', data => { this.pauseConsuming() })
      this.socket.on('topics_request', data => { this.ackTopics(data) })
      this.socket.on('initial_data_request', data => { this.sendInitials(data) })
      this.socket.on('update_labeling', data => { this.updateCustomLabels(data) })
    }

    consume(chans) {
        console.log('starting to consume...')
        // if (!chans)
        //   this.channels = this.channelsToObject(channels)
        // else
        this.channels = this.channelsToObject(chans)
        this.stream = T.streamChannels({track: this.channels, language: 'en'})
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

    channelsToObject(chans) {
      let res = {}
      for(const chan of chans) {
        res[chan.id] = chan.keywords.map(kw => kw.toLowerCase())
      }
      return res
    }

    channelsToArray(chans) {
      let res = []
      for (const chan of Object.keys(chans)) {
        res.push({
          id: chan.toLowerCase(),
          title: chan.charAt(0).toUpperCase() + chan.slice(1),
          keywords: chans[chan].map(kw => kw.toLowerCase())
        })
      }
      return res
    }

    updateChannels(data) {
      this.pauseConsuming()
      console.log('heeeeeeeeeeeeeeeeeey! STOPPPPP!')
      console.log(data)
      if (data.length > 0)
        this.consume(data)
    }

    async sendInitials(data) {
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

      // Get windowed tweets from bakjs
      const windowedTweets = await axios.get(config.get('bakjs').getTweets, {
        params: {
          from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime(), // Yesterday this time
          to: new Date(new Date().getTime() + 7 * 5 * 60 * 1000).getTime() // 5 minutes from now
        }
      })
        .then(response => {
          return response.data
        })
        .catch(err => {
          logger.error('error:', err);
          return []
        })

      console.log(this.channels)
      // Emit the results to clients
      this.socket.emit('bulk-update', {
        topics: this.channelsToArray(this.channels),
        aggregatedTopics: aggregateTopics,
        aggregatedUsers: aggregateUsers,
        aggregatedKeywords: aggregateKeywords,
        tweets: windowedTweets
      })
    }

    updateCustomLabels(data) {
      axios.post(config.get('bakjs').updateLabeling, {
        labels: data.tweet.labels,
        custom_theme: data.theme,
        custom_group: data.group,
        tweet: data.tweet
      })
        .then(response => {
          return true
        })
        .catch(err => {
          logger.error('error:', err);
          return false
        });
    }

    ackTopics(data) {
      console.log('Client connected!!')
      // TODO: change it to this.channels
      this.socket.emit('channels_response', this.channelsToArray(this.channels))
    }

    async handleTweet(tweet) {
        const that = this
        // Discard the tweet if it does not include any keywords
        if (Object.keys(tweet.$channels).length === 0) return
        console.log(tweet.text)

        // Pre-process the tweet
        tweet['topics'] = Object.assign({}, tweet.$channels)
        tweet['keywords'] = [...tweet.$keywords]
        if (tweet.extended_tweet)
            tweet.text = tweet.extended_tweet.full_text
        tweet['original_text'] = tweet.text
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

      console.log('temp has:' + this.temp.length)
      // Limit is now 20
      if (this.temp.length > 10){
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
        console.log(this.channels)
        // Emit the results to clients
        this.socket.emit('bulk-update', {
          topics: this.channelsToArray(this.channels),
          aggregatedTopics: aggregateTopics,
          aggregatedUsers: aggregateUsers,
          aggregatedKeywords: aggregateKeywords,
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
