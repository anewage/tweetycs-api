const config = require('config')
module.exports = {
    prefix: '/api',
    routes: [
        './controllers/api',
        './controllers/clusters',
        './controllers/tweets',
        './controllers/twit',
    ],
    registrations: [
        '@bakjs/mongo'
    ],
    mongo: config.get('mongo')
}
