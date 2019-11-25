const LSTMAdapter = require('./lstm')
const CNNAdapter = require('./cnn')
const SVMAdapter = require('./svm')
const KNNAdapter = require('./knn')
const RFAdapter = require('./rf')
const MLPAdapter = require('./mlp')
const predictCustomLabels = require('./custom')

let adapters = []
adapters.push(new LSTMAdapter('Long Short-Term Memory Model', 'LSTM'))
adapters.push(new CNNAdapter('Convolutional Neural Network Model', 'CNN'))
adapters.push(new SVMAdapter('Support Vector Machine', 'SVM'))
adapters.push(new KNNAdapter('K-nearest Neighbors', 'KNN'))
adapters.push(new RFAdapter('Random Forests', 'RF'))
adapters.push(new MLPAdapter('Multilayer Perceptron', 'MLP'))

async function analyzeTweet(tweet) {
    let res = []
    for (let adapter of adapters) {
        res.push(await adapter.getResponse(tweet))
    }
    const customLabel = await predictCustomLabels(res)
    if (customLabel.valid)
      res.push(customLabel)
    return res
}


module.exports = {
    analyzeTweet: async function (tweet) {
        return await analyzeTweet(tweet)
    }
}

