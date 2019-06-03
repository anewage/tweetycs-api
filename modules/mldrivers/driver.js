// Generic Driver for different ML algorithms
class Driver {
    constructor (title, id) {
        this.title = title
        this.id = id
    }
    // Implement on your own
    async predict (item) {}

    // Driver Function
    async getResponse(item) {
        let resp = await this.predict(item)
        return {
            id: this.id,
            title: this.title,
            result: resp
        }
    }
}

module.exports = Driver
