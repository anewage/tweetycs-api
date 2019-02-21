const { Controller } = require('bak')
const Twit = require('twit')
const Boom = require('boom')
const config = require('config')

export default class TwitController extends Controller {
    init () {
        this.$twit = new Twit(config.get('twit'))
        this.get('/twit/users/lookup', this.lookupUser)
    }

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
}
