const Adapter = require('./adapter')
const logger = require('../../plugins/log')
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
          document: true
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
                logger.error('error:', err);
                return {}
            });
    }

  // Override
  async getResponse(text) {
    let resp = await this.analyze(text)
    return Promise.resolve({
      id: this.id,
      title: this.title,
      result: resp.sentiment.document.score,
      meta: resp
    })
  }
}

module.exports = IBMAdapter
