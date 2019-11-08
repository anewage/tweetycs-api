const Controller = require('../controllers/controller')

/**
 * Generic Stream Consumer - Event Handler
 */
class BaseConsumer extends Controller{
    constructor (socket) {
      super(socket);
      this.stream = null
      this.temp = []
    }

    /**
     * Consuming the incoming stream - handling incoming events
     */
    consume() {}

    /**
     * Pause consuming the stream
     */
    pauseConsuming() {}

    /**
     * Generating a data stream - emitting events
     */
    produce() {}
}

module.exports = BaseConsumer
