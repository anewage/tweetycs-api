const Sentiment = require('sentiment')
const Adapter = require('./adapter')
const config = require('config')

class SentimentJS extends Adapter{
  constructor (title, id) {
    super(title, id)
    this.analyzer = new Sentiment()
  }
  async analyze(text) {
    const res = this.analyzer.analyze(text)
    return Promise.resolve(res)
  }
}

module.exports = SentimentJS
