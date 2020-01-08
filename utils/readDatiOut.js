var XLSX = require('xlsx')
var sheet2array = require('./sheet2array')
var checkTreeCompleteness = require('./checkTreeCompleteness')
var isVariableNameValid = require('./isVariableNameValid')
var isTreePrefixValid = require('./isTreePrefixValid')

module.exports = function(file) {
    
    var workbook = XLSX.readFile(file)
    var secondSheet = workbook.SheetNames[1]
    var worksheet = workbook.Sheets[secondSheet]

    var ordered = sheet2array(worksheet)
        .map(([vuoto, json, xml, complessita, livello, formato, tipo, elaborazione, obbligatorio, descrizione], index) => {

            var posizioneExcel = index + 4

            if (!json || !complessita || !livello || !formato)
                throw new Error(`Dati obbligatori mancanti output: riga ${posizioneExcel}`)

            if (!isVariableNameValid(json))
                throw new Error(`Nome variabile invalido "${json}" output: riga ${posizioneExcel}`)

            if (!isTreePrefixValid(livello))
                throw new Error(`Livello è invalido "${livello}" output: riga ${posizioneExcel}`)

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
            formato = formato.toLowerCase()

            return {
                xml,
                json,
                complessita,
                livello,
                formato,
                descrizione
            }
        })
        .sort((a, b) => a.livello.localeCompare(b.livello))

    // console.log(ordered)

    checkTreeCompleteness(ordered)

    return ordered

}
