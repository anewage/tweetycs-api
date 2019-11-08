/**
 * Generic Controller
 * DO NOT PUT ANY EXTRA CODE IN THIS FILE
 */
class EventController {

    constructor(socket) {
        this.socket = socket
    }

    setSocket(socket) {
      this.socket = socket
    }

    /**
     * Routes that the controller responds to
     */
    routes () {

    }

}

module.exports = EventController
