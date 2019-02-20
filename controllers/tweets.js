import { Controller } from 'bak'

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

    getTweets (request, h) {
        return {data: 'Tweets...'}
    }

    getKeywords (request, h) {
        return {data: 'Keywords...'}
    }
}
