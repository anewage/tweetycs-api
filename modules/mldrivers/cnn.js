const axios = require('axios')
const Driver = require('./driver')
const url1 = 'http://localhost:33507/cnntweet'
const url2 = 'http://localhost:33507/cnnuser'


class CNNAdapter extends Driver{
  async predict(tweet,user) {
    // Write code to predict or label a tweet based on user, text, etc...
    let res1 = await axios.post(url1, {
       'text': tweet
     }).then(function (response1){
        // response = JSON.parse(response)
       return response1.data
     }).catch(err => {
      // console.log('error:', err);
    })

    let res2 = await axios.post(url2, {
       'user':user
     }).then(function (response2){
       // response2 = JSON.parse(response)
       return response2.data
     }).catch(err => {
      // console.log('error:', err);
    });

    console.log('cnn done!')

     var res = {
      "theme":res1["theme"],
      "group":res2["group"],
     }
    return res
  }
}

module.exports = CNNAdapter
