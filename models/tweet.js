const {Model, Schema} = require('@bakjs/mongo')


class Tweet extends Model {
    static get $schema () {
        return {
            id: String,
            text: String,
        }
    }
}

module.exports = Tweet.$model
