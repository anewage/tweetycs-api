const preprocessor = require('../modules/preprocessors')

// Pre-processing
test('Pre-processing a text', () => {
    var text = '  RT #funnight ... Lead by    @example Get your tickets to @SandFestUk sorted; he\'s gooooood 🤙😎 https://www.sandfest.co.uk/   '
    return expect(preprocessor.preprocessText(text)).toBe('funnight lead by example get your tickets to sandfestuk sorted hes good 🤙😎');
});
