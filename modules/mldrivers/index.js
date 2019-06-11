const LSTMAdapter = require('./lstm')
const CNNAdapter = require('./cnn')
const SVMAdapter = require('./svm')
const KNNAdapter = require('./knn')
const RFAdapter = require('./rf')
const MLPAdapter = require('./mlp')

let adapters = []
adapters.push(new LSTMAdapter('Long Short-Term Memory Model', 'LSTM'))
adapters.push(new CNNdapter('Convolutional Neural Network Model', 'CNN'))
adapters.push(new SVMdapter('Support Vector Machine', 'SVM'))
adapters.push(new KNNdapter('K-nearest Neighbors', 'KNN'))
adapters.push(new RFdapter('Random Forests', 'RF'))
adapters.push(new MLPdapter('Multilayer Perceptron', 'MLP'))

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

