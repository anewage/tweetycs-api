module.exports = {
    rules: [
        // URLS
        {
            regExp: /((www\.[\S]+)|(http[\S]*))/g,
            replacement: ''
        },
        // Special Characters
        {
            regExp: /[-'"?!,.():;]/g,
            replacement: ''
        },
        // Twitter handles and hashtags
        {
            regExp: /[@#](\S)+/gi,
            replacement: function(m, p){
                return p ? m.substring(1, m.length) : m;
            }
        },
        // 2+ dots
        {
            regExp: /\.{2,}/g,
            replacement: ''
        },
        // Spaces
        {
            regExp: /\s\s*/g,
            replacement: ' '
        },
        // 2 letters
        {
            regExp: /(.)\1+/g,
            replacement: '$1$1'
        },
        // Retweet keywords
        {
            regExp: /\brt\b/g,
            replacement: ''
        },
        // Leading and trailing spaces
        {
            regExp: /^\s+|\s+$/g,
            replacement: ''
        },
    ],
    process: function(dataItem) {
        // Convert to lower case
        let text = dataItem.toLowerCase()
        for (let opt of this.rules) {
            text = text.replace(opt.regExp, opt.replacement)
        }
        return text
    }
}
