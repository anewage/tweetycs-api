const controllers = require('../controllers')
const consumers = require('../consumers')
module.exports = function (socket) {
    let _instances = []
    for (let index in controllers) {
        let Controller = controllers[index]
        let _instance = new Controller(socket)
        _instances.push(_instance)
    }
    for (let index in consumers) {
      let Consumer = consumers[index]
      let _instance = new Consumer(socket).getInstance()
      _instance.setSocket(socket)
      _instances.push(_instance)
    }
    for (let _instance of _instances) {
      _instance.routes()
    }
}
