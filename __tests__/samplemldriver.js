const LSTMAdapter = require('../modules/mldrivers/lstm')
const instance = new LSTMAdapter('hi', 'hi')
test('Sample ML Driver', async () => {
  let tweet = 'hi how are you'
  let user= {
    screen_name: 'Obama',
    description: 'Something...'
  }
  return expect(await instance.predict(tweet,user)).toStrictEqual(
     "unrelated"
  );
},30000)
