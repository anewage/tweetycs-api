const controllers = require('../controllers')
module.exports = function (socket) {
    let _instances = []
    for (let index in controllers) {
        let Controller = controllers[index]
        let _instance = new Controller(socket)
        _instances.push(_instance)
    }
    for (let _instance of _instances) {
        _instance.routes()
    }
}
