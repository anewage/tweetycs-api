const Adapter = require('./adapter')

class SampleMLAdapter extends Adapter{
    async analyze(text) {
        return {
          category: 'this',
          user_category: 'that'
        }
    }
}

module.exports = SampleMLAdapter
