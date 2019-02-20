const { Controller } = require('bak')
const { Tweet } = require('../models')

export default class APIController extends Controller {
    init () {
        this.get('/tweet/{id}', this.getTweet)
        this.get('/tweets', this.getTweets)
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

    getKeywords (request, h) {
        return {data: 'Keywords...'}
    }
}
