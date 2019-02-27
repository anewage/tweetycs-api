// const axios = require('axios')
const { Tweet} = require('./models')
var Twit = require('twit')
var config = require('config')

var T = new Twit(config.get('twit'))

// T.get('search/tweets?q=HIV%20since:2006-01-01', function(err, data, response) {
//     console.log(data)
// })

var count = 0
var st = T.stream('statuses/filter', {track: ['cancer']})
st.on('tweet', function (tweet) {
    console.log(count)
    console.log(count, tweet)
    let toSave = new Tweet(tweet)
    console.log('toSave is: ', toSave)
    toSave.save()
    count++
})

// axios.get('https://api.twitter.com/1.1/tweets/search/', {
//     params: {
//         ID: 12345
//     }
// }).then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     })
