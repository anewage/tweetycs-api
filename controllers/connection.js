const Controller = require('./controller')
/**
 * Connection Controller
 */
class ConnectionController extends Controller{

    /**
     * Routes that the controller responds to
     */
    routes () {
        // At the beginning of the connection
        this.socket.emit('server_response', {data: 'Connected', 'count': 0})

        // Test connection
        this.socket.on('connect', data => { this.testConnect(data) } )

        // Ping response
        this.socket.on('client_ping', data => { this.pingPong(data) })

        // Disconnect
        this.socket.on('disconnect_request', data => { this.disconnectRequest(data) })

        // Test disconnection
        this.socket.on('disconnect', data => { this.testDisconnect(data) })
    }

    testConnect(data) {
        console.log('Client connected!!')
        this.socket.emit('server_response', {data: 'Connected', 'count': 0})
    }

    pingPong(data) {
        this.socket.emit('server_pong')
    }

    disconnectRequest(data) {
        this.socket.emit('server_response', {data: 'Disconnected!'})
        this.socket.disconnect(true)
    }

    testDisconnect(data) {
        return this.socket.connected
    }

}

module.exports = ConnectionController
