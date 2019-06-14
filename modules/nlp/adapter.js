// Generic Adapter for different NLP APIs
class Adapter {
    constructor (title, id) {
        this.title = title
        this.id = id
    }
    // Implement on your own
    async analyze (text) {}

    // Driver Function
    async getResponse(text) {
        let resp = await this.analyze(text)
        return Promise.resolve({
          id: this.id,
          title: this.title,
          result: resp
        })
    }
}

module.exports = Adapter
