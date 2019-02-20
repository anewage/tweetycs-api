const { Controller } = require('bak')
const Twit = require('twit')
const config = require('config')
const { Tweet, Request } = require('../models')

export default class APIController extends Controller {
    init () {
        this.$twit = new Twit(config.get('twit'))
        this.get('/tweet/{id}', this.getTweet)
        this.get('/tweets', this.getTweets)
        this.post('/tweets/update', this.updateTweets)
        this.get('/keywords', this.getKeywords)
    }

    getTweet (request, h) {
        let id = request.params.id
        return {data: 'Tweet #' + id}
    }

    async getTweets (request, h) {
        try {
            let tweets = await Tweet.find()
            return {data: tweets}
        } catch (e) {
            console.log(e)
        }
    }

    async updateTweets (request, h) {
        try {
            let resp = await this.$twit.get('search/tweets', { q: request.payload.q, count: 200000 })
                .then(async function (result) {
                    let req = new Request(result.data.search_metadata)
                    req.save()
                    for (let tw of result.data.statuses) {
                        let tweet = new Tweet(tw)
                        tweet.save()
                    }
                    return result.data.search_metadata
                })
            return {data: resp}
        } catch (e) {
            console.log(e)
        }
    }

    getKeywords (request, h) {
        return {data: 'Keywords...'}
    }
}
