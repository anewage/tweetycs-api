const LSTMAdapter = require('./lstm')
const CNNAdapter = require('./cnn')
const SVMAdapter = require('./svm')
const KNNAdapter = require('./knn')
const RFAdapter = require('./rf')
const MLPAdapter = require('./mlp')

let adapters = []
adapters.push(new LSTMAdapter('MY Great Sample machine Learning Adapter', 'mladapter1'))
adapters.push(new CNNdapter('MY Great Sample machine Learning Adapter', 'mladapter2'))
adapters.push(new SVMdapter('MY Great Sample machine Learning Adapter', 'mladapter3'))
adapters.push(new KNNdapter('MY Great Sample machine Learning Adapter', 'mladapter4'))
adapters.push(new RFdapter('MY Great Sample machine Learning Adapter', 'mladapter5'))
adapters.push(new MLPdapter('MY Great Sample machine Learning Adapter', 'mladapter6'))

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

