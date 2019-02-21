const { Controller } = require('bak')
const Boom = require('boom')
const { DerivedTweet } = require('../models')

export default class UsersController extends Controller {
    init () {
        this.get('/user/{username}', this.getUser)
        this.get('/user/{username}/tweets', this.getTweetsByUser)
        this.get('/users/aggregate', this.getUsersAggregate)
    }

    async getUser (request, h) {
        try {
            let tweet = await DerivedTweet.findOne({ 'user_screen_name': request.params.username })
            const allowed_keys = ['user_id', 'user_screen_name', 'user_followers_count', 'user_friends_count', 'user_favourites_count', 'influence_ratio', 'user_statuses_count', 'user_verified', 'user_description', 'user_category']
            if (tweet) {
                return {
                    data: allowed_keys.reduce((obj, key) => ({ ...obj, [key]: tweet[key]}), {})
                }
            } else {
                return Boom.notFound()
            }

        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }

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
