const BaseConsumer = require('./baseconsumer')
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

    handleTweet(tweet) {
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

module.exports = TwitterConsumer
