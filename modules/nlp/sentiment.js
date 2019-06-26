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

  // Override
  async getResponse(text) {
    let resp = await this.analyze(text)
    return Promise.resolve({
      id: this.id,
      title: this.title,
      result: resp.comparative / 5,
      meta: resp
    })
  }
}

module.exports = SentimentJS
