const SampleMLAdapter = require('./sample')

let adapters = []
adapters.push(new SampleMLAdapter('MY Great Sample machine Learning Adapter', 'mladapter1'))

async function analyzeTweet(tweet) {
    let res = []
    for (let adapter of adapters) {
        res.push(await adapter.getResponse(tweet))
    }
    return res
}


module.exports = {
    analyzeTweet: async function (tweet) {
        return await analyzeTweet(tweet)
    }
}
