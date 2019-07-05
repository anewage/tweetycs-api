const Adapter = require('./adapter')
const config = require('config')
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-04-02',
    iam_apikey: config.IBM.api_key,
    url: config.IBM.url,
});
let analyzeParams = {
    features: {
        concepts: {
            limit: 3
        },
        emotion: {
            targets: [
                'disease',
                'health',
                'mortality'
            ]
        },
        entities: {
            emotion: true,
            sentiment: true,
            limit: 2,
        },
        keywords: {
            emotion: true,
            sentiment: true,
            limit: 3,
        },
        semantic_roles: {
            limit: 10,
            keywords: true,
            entities: true
        },
        sentiment: {
            targets: [
                'health'
            ]
        }
    },
};

class IBMAdapter extends Adapter{
    async analyze(text) {
        analyzeParams['text'] = text
        return naturalLanguageUnderstanding.analyze(analyzeParams)
            .then(analysisResults => {
                return analysisResults
            })
            .catch(err => {
                console.log('error:', err);
                return {}
            });
    }
}

module.exports = IBMAdapter
