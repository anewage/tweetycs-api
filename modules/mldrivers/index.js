// const LSTMAdapter = require('./lstm')
// const CNNAdapter = require('./cnn')
// const SVMAdapter = require('./svm')
// const KNNAdapter = require('./knn')
// const RFAdapter = require('./rf')
// const MLPAdapter = require('./mlp')
const sample = require('./sample')

let adapters = []
adapters.push(new sample('Model 1', 'm1'))
adapters.push(new sample('Model 2', 'm2'))
adapters.push(new sample('Model 3', 'm3'))
adapters.push(new sample('Model 4', 'm4'))
adapters.push(new sample('Model 5', 'm5'))
adapters.push(new sample('Model 6', 'm6'))
// adapters.push(new LSTMAdapter('Long Short-Term Memory Model', 'LSTM'))
// adapters.push(new CNNAdapter('Convolutional Neural Network Model', 'CNN'))
// adapters.push(new SVMAdapter('Support Vector Machine', 'SVM'))
// adapters.push(new KNNAdapter('K-nearest Neighbors', 'KNN'))
// adapters.push(new RFAdapter('Random Forests', 'RF'))
// adapters.push(new MLPAdapter('Multilayer Perceptron', 'MLP'))

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

