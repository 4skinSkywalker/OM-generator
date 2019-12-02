var stringToPascalNotation = require('./stringToPascalNotation')

module.exports = function(string, isPrimitive) {

    var map = {
        short: 'String',
        string: 'String',
        long: 'Long',
        int: 'Integer',
        timestamp: 'Date',
        decimal: 'BigDecimal'
    }

    var index = string.indexOf('(')

    if (index > -1) {
        string = string.slice(0, index).toLowerCase()
    }

    if (!isPrimitive) {
        return stringToPascalNotation(string)
    }

    if (!map[string]) {
        throw new Error(`${string} non è un tipo valido.`)
    }

    return map[string]
}