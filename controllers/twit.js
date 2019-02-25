const { Controller } = require('bak')
const Twit = require('twit')
const Boom = require('boom')
const config = require('config')
const { Tweet, Request } = require('../models')

export default class TwitController extends Controller {

    /**
     * Includes the routings for this controller
     */
    init () {
        this.$twit = new Twit(config.get('twit'))
        this.get('/twit/users/lookup', this.lookupUser)
        this.get('/twit/stream', this.stream)
        this.post('/twit/fetch', this.fetchTweets)
    }


    /**
     * Lookup a user from real Twitter API by their `user_id` or `screen_name`
     * @param request must include list of ids or names as parameters
     * @param h
     * @returns {Promise<{data: (*|T|T)}>}
     */
    async lookupUser (request, h) {
        try {
            let params = {
                screen_name: request.query.screen_name,
                user_id: request.query.user_id
            }
            let real_user = await this.$twit.get('users/lookup', params)
                .then(async function (result) {
                    return result.data
                })
            return {data: real_user}
        } catch (e) {
            console.log(e)
            throw Boom.badRequest(e)
        }
    }


    /**
     * Fetch new tweets from Twitter's API based on the `q` inside the payload of `request`
     * @param request must include `q` as the query inside the `payload`
     * @param h
     * @returns {Promise<{data: (*|T|T)}>}
     */
    async fetchTweets (request, h) {
        try {
            let params = {
                q: request.payload.q,
                count: 100
            }
            let resp = await this.$twit.get('search/tweets', params)
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
            Boom.badRequest(e)
        }
    }

    async stream (request, h) {
        var st = this.$twit.stream('statuses/filter', {track: ['cancer', 'myeloma', 'lymphoma', 'leukemia', 'laryngeal']})
        st.on('tweet', function (tweet) {
            console.log("got it!")
            let toSave = new Tweet(tweet)
            toSave.save()
        })
        st.on('message', function (msg) {
            console.log('>>>> Message Received: ', msg)
        })
        return 'OK'
    }
}
