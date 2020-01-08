module.exports = function(string) {

    var index = string.indexOf('(')

    if (index > -1)
        return string.slice(0, index).toLowerCase()

    return string

}