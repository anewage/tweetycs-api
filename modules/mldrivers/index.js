const SampleMLAdapter = require('./sample')

let adapters = []
adapters.push(new SampleMLAdapter('sample', 'sample'))

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
