const { Controller } = require('bak')
const Boom = require('boom')
const { DerivedTweet, Tweet } = require('../models')

export default class TweetsController extends Controller {

    /**
     * Includes the routings for this controller
     */
    init () {
        this.get('/tweets', this.getTweets)
        this.post('/tweet/save', this.saveTweet)
    }


    /**
     * Get batch of tweets stored in the database based on the query
     * @param request
     * @param h
     * @returns {Promise<{data: *}>}
     */
    async getTweets (request, h) {
        try {
            let tweets = await DerivedTweet.find(request.query)
            return {data: tweets}
        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }

    async saveTweet (request, h) {
        try {
            var tweet = new Tweet(request.payload.tweet)
            await tweet.save()
            return 'OK'
        } catch (e) {
            Boom.badRequest()
        }
    }
}
