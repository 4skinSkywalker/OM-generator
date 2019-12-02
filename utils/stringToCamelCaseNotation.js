var stringToPascalNotation = require('./stringToPascalNotation')

module.exports = function(string) {

    var pascalNotation = stringToPascalNotation(string)
    return pascalNotation[0].toLowerCase() + pascalNotation.slice(1)
}