// Generic Adapter for different NLP APIs
class Adapter {
    constructor (title) {
        this.title = title
    }
    // Implement on your own
    async analyze (text) {}

    // Driver Function
    async getResponse(text) {
        let resp = await this.analyze(text)
        return {
            title: this.title,
            result: resp
        }
    }
}

module.exports = Adapter
