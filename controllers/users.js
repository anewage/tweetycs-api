const { Controller } = require('bak')
const Boom = require('boom')
const { DerivedTweet } = require('../models')

export default class UsersController extends Controller {
    init () {
        this.get('/user/{username}', this.getUser) // Get individual users from DB
        this.get('/user/{username}/tweets', this.getTweetsByUser) // Get tweets by a specific user from DB
        this.get('/users/aggregate', this.getUsersAggregate) // Get aggregated data for a specific user
    }

    /**
     * Get each individual user stored in the database by their `user_screen_name`
     * @param request must include `username` as a parameter
     * @param h
     * @returns {Promise<{data: *}>}
     */
    async getUser (request, h) {
        try {
            let tweet = await DerivedTweet.findOne({ 'user_screen_name': request.params.username })
            // Filter the tweet to extract user related data
            const allowed_keys = ['user_id', 'user_screen_name', 'user_followers_count', 'user_friends_count', 'user_favourites_count', 'influence_ratio', 'user_statuses_count', 'user_verified', 'user_description', 'user_category']
            return {data: allowed_keys.reduce((obj, key) => ({ ...obj, [key]: tweet[key]}), {})}

        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }


    /**
     * Get batch of tweets written by a specific user determined by `user_screen_name`.
     * Can limit the output by including a `limit` in the query.
     * @param request must include `username` as a parameter
     * @param h
     * @returns {Promise<{data: *}>}
     */
    async getTweetsByUser (request, h) {
        try {
            let username = request.params.username
            let limit = parseInt(request.query.limit) || 100
            let tweets = await DerivedTweet.find({ user_screen_name: username }, null, { limit: limit})
            return {data: tweets}
        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }


    /**
     * Get aggregated results from tweets based on their users.
     * Can limit the output by including a `limit` in the query.
     * @param request
     * @param h
     * @returns {Promise<{data: *}>}
     */
    async getUsersAggregate (request, h) {
        try {
            let limit =  parseInt(request.query.limit) || 100
            let key = request.query.key || 'user_screen_name'
            let aggregated = await DerivedTweet.aggregate([
                { '$sortByCount': '$' + key },
                { '$limit': limit }
            ])
            return {data: aggregated}
        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }
}
