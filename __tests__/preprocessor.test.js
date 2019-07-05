const preprocessor = require('../modules/preprocessors/tweetprocessor')

// Pre-processing
test('Pre-processing a text', () => {
    var text = '  RT #funnight ... Lead by    @example Get your tickets to @SandFestUk sorted; he\'s gooooood 🤙😎 https://www.sandfest.co.uk/   '
    return expect(preprocessor.process(text)).toBe('funnight lead by example get your tickets to sandfestuk sorted hes good 🤙😎');
});
