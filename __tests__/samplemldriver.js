const MLPAdapter = require('../modules/mldrivers/mlp')
const instance = new MLPAdapter('hi', 'hi')
test('Sample ML Driver', async () => {
  let tweet = 'hi how are you'
  let user= 'Obama'
  return expect(await instance.predict(tweet,user)).toStrictEqual(
     "unrelated"
  );
},30000)
