const axios = require('axios')
const Driver = require('./driver')
const url = 'http://localhost:5000/svmuser'

class SampleMLAdapter extends Driver{
  async predict(tweet) {
    // Write code to predict or label a tweet based on user, text, etc...
    // let res = await axios.post(url, {
    //   tweet: tweet
    // }).then(function (response){
    //   response = JSON.parse(response)
    //   return response.data
    // })
    /**
     *  res = {
     *      userCategory: 'celebrity',
     *      contentTheme: 'educational',
     *      ...
     *      ...
     *      ...
     *  }
     */
    let res = {
      hi: 'hello'
    }
    return res
  }
}

module.exports = SampleMLAdapter
