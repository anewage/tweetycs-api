const {Model, Schema} = require('@bakjs/mongo')


class Request extends Model {
    static get $schema () {
        return {
            completed_in: String,
            max_id: String,
            max_id_str: String,
            next_results: String,
            query: String,
            refresh_url: String,
            count: Number,
            since_id: String,
            since_id_str: String
        }
    }
}

module.exports = Request.$model
