const Adapter = require('./adapter')
const Analyzer = require('natural').SentimentAnalyzer
const stemmer = require('natural').PorterStemmer
const WordTokenizer = require('natural').WordTokenizer

class NaturaljsAdapter extends Adapter{

    constructor(title, id){
        super(title, id)
        this.tokenizer = new WordTokenizer()
        this.analyzers = []
        let types = ['afinn', 'senticon', 'pattern']
        for (let type of types) {
            this.analyzers.push({
                type: type,
                analyzer: new Analyzer("English", stemmer, type)
            })
        }
    }

    analyze(text) {
        let analysisResult = {}
        let _textInArray = this.tokenizer.tokenize(text)
        for(let obj of this.analyzers){
            analysisResult[obj.type] = obj.analyzer.getSentiment(_textInArray)
        }
        return analysisResult
    }
}

module.exports = NaturaljsAdapter
