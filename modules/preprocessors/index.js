const tweetProcessor = require('./tweetprocessor')
module.exports = {
    tweetProcessor,
    preprocess: function (dataItem) {
        let results = []
        let _instances = []
        _instances.push(tweetProcessor)
        for (let _instance of _instances) {
            results.push(_instance.process(dataItem))
        }
        return results
    }
}
