const Adapter = require('./adapter')
const Analyzer = require('natural').SentimentAnalyzer
const stemmer = require('natural').PorterStemmer
const WordTokenizer = require('natural').WordTokenizer

class NaturaljsAdapter extends Adapter{

    constructor(title, id, type){
        super(title, id)
        this.tokenizer = new WordTokenizer()
        this.analyzer = new Analyzer("English", stemmer, type)
    }

    analyze(text) {
        let _textInArray = this.tokenizer.tokenize(text)
        return this.analyzer.getSentiment(_textInArray) / 5
    }
}

module.exports = NaturaljsAdapter
