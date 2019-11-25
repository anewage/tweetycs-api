const axios = require('axios')
const Driver = require('./driver')
const logger = require('../../plugins/log')
const config = require('config')
const url1 = config.flask.dlapp_uri + 'cnntweet'
const url2 = config.flask.dlapp_uri + 'cnnuser'


async function predictCustomLabels(labels) {
  let custom_group = ''
  let custom_theme = ''
  let customLabel = false
  const summs = await axios.get(config.get('bakjs').getSummaries)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      logger.error('error:', err);
      return []
    });
  const sortedSummaries = sortSummaries(summs, labels)
  if (sortedSummaries.length > 0) {
    if (sortedSummaries[0].value > 8) {
      custom_theme = sortedSummaries[0].custom_theme
      custom_group = sortedSummaries[0].custom_group
      customLabel = true
    }
  }
  return {
    id: 'custom',
    title: 'User Customized Labeling',
    valid: customLabel,
    result: {
      group: custom_group,
      theme: custom_theme
    }
  }
}

function sortSummaries(summs, labels, context = ['group', 'theme']) {
  for (let summary of summs) {
    summary['value'] = 0
    for(const label of labels){
      const toCheck = summary.labels.find(a => a.id === label.id)
      if (toCheck) {
        for (const item of context)
          if (toCheck.result[item] === label.result[item])
            summary.value ++
      }
    }
  }
  return summs.sort( (a, b) => {
    return a.value > b.value
  })
}

module.exports = predictCustomLabels

