const axios = require('axios')

// TODO: handle promise await
module.exports = {
    process: function(dataItem) {
        // Convert to lower case
        tweet.text = axios.post('http://localhost:5000/preprocess/', {
            tweet: dataItem
        }).then(function (response){
            return response.data
        })
    }
}
