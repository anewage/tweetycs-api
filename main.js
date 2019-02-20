var Twit = require('twit')
var config = require('config')

var T = new Twit(config.get('twit'))

T.get('search/tweets', { q: 'HIV since:2006-01-01', count: 200000 }, function(err, data, response) {
    console.log(data.statuses[0])
})
