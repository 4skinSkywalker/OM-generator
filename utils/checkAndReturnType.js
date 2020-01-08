var stringToPascalNotation = require('./stringToPascalNotation')
var removeParenthesis = require('./removeParenthesis')
var typesMap = require('../configs/typesMap')

module.exports = function(string, isPrimitive) {

    string = removeParenthesis(string)

    if (!isPrimitive) return stringToPascalNotation(string)

    if (!typesMap[string]) throw new Error(`${string} non è un tipo valido.`)

    return typesMap[string].nome

}