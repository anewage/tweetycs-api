const SampleMLAdapter = require('../modules/mldrivers/sample')
const instance = new SampleMLAdapter('hi', 'hi')
test('Sample ML Driver', async () => {
  let tweet = {}
  return expect(await instance.predict(tweet)).toStrictEqual({
    hi: 'hello'
  });
})
