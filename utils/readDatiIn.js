var XLSX = require('xlsx')
var sheet2array = require('./sheet2array')
var checkTreeCompleteness = require('./checkTreeCompleteness')
var isVariableNameValid = require('./isVariableNameValid')
var isTreePrefixValid = require('./isTreePrefixValid')

module.exports = function(file) {

    var workbook = XLSX.readFile(file)
    var firstSheet = workbook.SheetNames[0]
    var worksheet = workbook.Sheets[firstSheet]

    var ordered = sheet2array(worksheet)
        .map(([vuoto, xml, json, complessita, livello, formato, tipo, elaborazione, obbligatorio, descrizione, mock], index) => {

            var posizioneExcel = index + 4

            if (!json || !complessita || !livello || !formato)
                throw new Error(`Dati obbligatori mancanti input: riga ${posizioneExcel}`)

            if (!isVariableNameValid(json))
                throw new Error(`Nome variabile invalido "${json}" input: riga ${posizioneExcel}`)

            if (!isTreePrefixValid(livello))
                throw new Error(`Livello è invalido "${livello}" input: riga ${posizioneExcel}`)

            descrizione = (descrizione)
                ? descrizione
                    .split('\n')
                    .map((w, i) => (i === 0) ? w : ' * ' + w)
                    .join('\n')
                : 'TODO'
            
            livello = livello
                .split('.')
                .map(n => n.padStart(3, 0))
                .join('.')

            complessita = complessita.toLowerCase()

            return {
                xml,
                json,
                complessita,
                livello,
                formato,
                descrizione,
                mock
            }
        })
        .sort((a, b) => a.livello.localeCompare(b.livello))

    // console.log(ordered)

    checkTreeCompleteness(ordered)

    return ordered

}
