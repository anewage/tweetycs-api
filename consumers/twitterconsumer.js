const BaseConsumer = require('./baseconsumer')
const { preprocess } = require('../modules/preprocessors')
const nlp = require('../modules/nlp')
const config = require('config')
const keywords = config.get('keywords')
let Twit = require('twit')
let T = new Twit(config.get('twit'))

class TwitterConsumer extends BaseConsumer {

    consume() {
        if (this.stream)
            this.stream.start()
        else
            this.stream = T.stream('statuses/filter', {track: keywords, language: 'en'})
                .on('tweet', tweet => this.handleTweet(tweet))
        return this.stream
    }

    pauseConsuming() {
        if (this.stream)
            this.stream.stop()
        return true
    }

    async handleTweet(tweet) {
        // Pre-process the tweet
        if (tweet.extended_tweet)
            tweet.text = tweet.extended_tweet.full_text
        tweet.text = preprocess(tweet.text)[0]

        // Analyze the tweet (NLP PART)
        tweet['analysis'] = await nlp.analyzeText(tweet.text)

        // Save the tweet --- pass it to Bakjs for saving
        // axios.post('http://localhost:3000/api/tweet/save', {tweet: tweet})
        //     .then(response => {
        //         this.emit('server_response', {data: 'Tweet: ' + tweet.text})
        //     })
        //     .catch(err => {
        //         console.log('error:');
        //     });
    }

}

module.exports = TwitterConsumer
