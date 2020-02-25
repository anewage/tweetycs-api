const IBMAdapter = require('./ibm')
const NaturalJSAdapter = require('./naturaljs')
const SentimentJS = require('./sentiment')

let adapters = []
adapters.push(new IBMAdapter('IBM Natural Language Understanding API', 'ibm'))
adapters.push(new NaturalJSAdapter('Natural JS Library - AFINN-165 Vocab.', 'naturaljs-afinn165', 'afinn'))
adapters.push(new NaturalJSAdapter('Natural JS Library - SENTICON Vocab.', 'naturaljs-senticon', 'senticon'))
adapters.push(new NaturalJSAdapter('Natural JS Library - PATTERN Vocab.', 'naturaljs-pattern', 'pattern'))
adapters.push(new SentimentJS('Sentiment JS Library', 'sentimentjs'))

async function analyzeText(text) {
    let res = []
    for (let adapter of adapters) {
        res.push(await adapter.getResponse(text))
    }
    return Promise.resolve(res)
}


module.exports = {
    analyzeText: async function (text) {
        return await analyzeText(text)
    }
}
