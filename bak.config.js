const config = require('config')
module.exports = {
    prefix: '/api',
    routes: [
        './controllers/api',
        './controllers/meta',
        './controllers/tweets',
        './controllers/users',
        './controllers/twit',
    ],
    registrations: [
        '@bakjs/mongo'
    ],
    mongo: config.get('mongo')
}
