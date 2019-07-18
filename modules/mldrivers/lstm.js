const axios = require('axios')
const Driver = require('./driver')
const logger = require('../../plugins/log')
const config = require('config')
const url1 = config.flask.dlapp_uri + 'lstmtweet'
const url2 = config.flask.dlapp_uri + 'lstmuser'


class LSTMAdapter extends Driver{
  async predict(tweet,user) {
    let res1 = await axios.post(url1, {
       'tweet': tweet.text
     }).then(function (response1){
       return response1.data
     }).catch(err => {
      logger.error('error:', err);
    });

    let res2 = await axios.post(url2, {
       'user_description':tweet.user.description
     }).then(function (response2){
       return response2.data
     }).catch(err => {
      logger.error('error:', err);
    });


    return {
      theme: res1['theme'],
      group: res2['group'],
    }
  }
}

module.exports = LSTMAdapter

