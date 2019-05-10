const EventController = require('./controller')
/**
 * Connection Controller
 */
class ConnectionController extends EventController{

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

        // Joining a room
        this.socket.on('join', data => { this.join(data) })

        // Leaving a room
        this.socket.on('leave', data => { this.leave(data) })
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

    join(message) {
        this.socket.join(message.room, data => {
            let rooms = Object.keys(this.rooms);
            // broadcast to everyone in the room
            this.to(message.room).emit('server_response', {data: 'a new user has joined the room'});
            this.emit('server_response', {data: 'In rooms: ' + rooms , rooms: rooms})
        })
    }

    leave(message) {
        this.socket.leave(message.room, data => {
            let rooms = Object.keys(this.rooms);
            // broadcast to everyone in the room
            this.to(message.room).emit('server_response', {data: 'a user has left the room'});
            this.emit('server_response', {data: 'In rooms: ' + rooms , rooms: rooms})
        })
    }

}

module.exports = ConnectionController
