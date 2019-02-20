var Twit = require('twit')
var config = require('config')

var T = new Twit(config.get('twit'))

T.get('search/tweets', { q: 'کامفورت زون', count: 1000 }, function(err, data, response) {
    console.log(data.statuses[0].user)
})
