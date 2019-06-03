const IBMAdapter = require('./IBM')
const NaturalJSAdapter = require('./naturaljs')

let adapters = []
adapters.push(new IBMAdapter('IBM Natural Language Understanding API', 'ibm'))
adapters.push(new NaturalJSAdapter('Natural JS Library', 'natural'))

async function analyzeText(text) {
    let res = []
    for (let adapter of adapters) {
        res.push(await adapter.getResponse(text))
    }
    return res
}


module.exports = {
    analyzeText: async function (text) {
        return await analyzeText(text)
    }
}
