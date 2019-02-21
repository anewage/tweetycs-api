const {Model, Schema} = require('@bakjs/mongo')


class DerivedTweet extends Model {
    static get $schema () {
        return {
            tweet: String,
            category: String,
            cluster: String,
            cause: String,
            sentiment: String,
            sentiment_score: Object,
            user_id: Object,
            user_screen_name: String,
            user_followers_count: Number,
            user_friends_count: Number,
            user_favourites_count: Number,
            influence_ratio: Object,
            user_statuses_count: Number,
            user_verified: Boolean,
            user_description: String,
            user_category: String
        }
    }
}

module.exports = DerivedTweet.$model
