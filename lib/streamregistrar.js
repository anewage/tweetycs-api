const consumers = require('../consumers')
module.exports = function () {
    let _instances = []
    for (let index in consumers) {
        let Consumer = consumers[index]
        let _instance = new Consumer().getInstance()
        _instances.push(_instance)
    }
    // for (let _instance of _instances) {
    //     _instance.consume()
    // }
}
