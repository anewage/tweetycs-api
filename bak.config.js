const config = require('config')
module.exports = {
    prefix: '/api',
    routes: [
        './controllers/api',
        './controllers/clusters',
        './controllers/tweets',
    ],
    registrations: [
        '@bakjs/mongo'
    ],
    mongo: config.get('mongo')
}
