/**
 * Generic Stream Consumer - Event Handler
 */
class BaseConsumer {
    constructor () {
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
