const EventController = require('./controller')
const config = require('config')
const keywords = config.get('keywords')
let Twit = require('twit')
let T = new Twit(config.get('twit'))
/**
 * Generic Controller
 */
class Clientcontroller extends EventController {

    constructor(socket) {
        super(socket);
        this.fetching = false
        this.stream = null
    }

    /**
     * Routes that the controller responds to
     */
    routes () {
        this.socket.on('client_event', data => { this.testMessage(data) })
        this.socket.on('client_broadcast_event', data => { this.testBroadcastMessage(data) })
        this.socket.on('client_room_event', data => { this.sendRoomMessage(data) })
    }

    testMessage(message) {
        this.socket.emit('server_response', {data: message.data})
    }

    testBroadcastMessage(message) {
        this.socket.broadcast.emit('server_response', {data: message.data})
        console.log('BROADCAST: ', message.data )
    }

    sendRoomMessage(message) {
        this.socket.to(message.room).emit('server_response', {data: message.data})
    }


}

module.exports = Clientcontroller
