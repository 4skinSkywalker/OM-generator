module.exports = function(string) {

    if (!string) {
        return ''
    }

    return string
        .split('\n')
        .map((line, i) => {
            if (i === 0) {
                return line
            }
            return '\t' + line
        })
        .join('\n')
}