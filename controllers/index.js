const Controller = require('./controller')
const ConnectionController = require('./connection')


module.exports = function (socket) {
    let controllers = []
    controllers.push(new Controller(socket))
    controllers.push(new ConnectionController(socket))
    for (let controller of controllers) {
        controller.routes()
    }
}
