var stringToPascalNotation = require('./stringToPascalNotation')
var removeParenthesis = require('./removeParenthesis')
var typesMap = require('../configs/typesMap')

module.exports = function(string, isPrimitive = false, hasBypass = false) {

    string = removeParenthesis(string)

    // hasBypass è true quando si vuole verificare se una lista è di oggetti semplici o complessi
    if (hasBypass)
        return (typesMap[string])
            ? typesMap[string].nome
            : null

    if (!isPrimitive) return stringToPascalNotation(string)

    if (!typesMap[string]) throw new Error(`${string} non è un tipo valido.`)

    return typesMap[string].nome

}