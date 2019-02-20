var Twit = require('twit')

var T = new Twit({
    consumer_key:         'OMYGYl2qOO1ANmM8L9AL9mMs5',
    consumer_secret:      '3oihWwj46oYNm0m5sHcbHCAECYfjfSNZ5nswRO1ttBNrxe374p',
    access_token:         '563293530-eSQcpDywiUK3mCTPdZE29wzPIjx0sGyCjxk4UqkR',
    access_token_secret:  'lDATqZDpu9ejtPFRpqXw6N95YoSimrZ3242OxCsIKo0Vz',
    // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

T.get('search/tweets', { q: 'کامفورت زون', count: 1000 }, function(err, data, response) {
    console.log(data.statuses[0].user)
})
