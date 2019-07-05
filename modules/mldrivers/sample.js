const Driver = require('./driver')

class SampleMLAdapter extends Driver{
  async predict(tweet) {
    const userCategories = ['Public', 'Interest Groups', 'Businesses', 'Media', 'Celebrities', 'Official Agencies']
    const contentThemes = ['Educational', 'Personal', 'Promotional', 'Fundraising']
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
      userCategory: userCategories[Math.floor(Math.random() * 6)],
      contentTheme: contentThemes[Math.floor(Math.random() * 4)]
    }
    return Promise.resolve(res)
  }
}

module.exports = SampleMLAdapter
