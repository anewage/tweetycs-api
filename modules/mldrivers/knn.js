const axios = require('axios')
const Driver = require('./driver')
const config = require('config')
const url1 = config.flask.mlapp_uri + 'knntweet'
const url2 = config.flask.mlapp_uri + 'knnuser'


class   KNNAdapter extends Driver{
  async predict(tweet) {
    // Write code to predict or label a tweet based on user, text, etc...
    let res1 = await axios.post(url1, {
       'tweet': tweet.text
     }).then(function (response1){
       return response1.data
     }).catch(err => {
      console.log('error:', err);
    });

    let res2 = await axios.post(url2, {
       'user_description':tweet.user.description
     }).then(function (response2){
       return response2.data
     }).catch(err => {
      console.log('error:', err);
    });



    return {
      theme: res1['theme'],
      group: res2['group'],
    }
  }
}

module.exports = KNNAdapter

