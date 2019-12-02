var XLSX = require('xlsx')
var sheet2array = require('./sheet2array')
var checkTreeCompleteness = require('./checkTreeCompleteness')
var isVariableNameValid = require('./isVariableNameValid')

module.exports = function(file) {

    var workbook = XLSX.readFile(file)
    var firstSheet = workbook.SheetNames[0]
    var worksheet = workbook.Sheets[firstSheet]

    var ordered = sheet2array(worksheet)
        .map(([vuoto, xml, json, complessita, livello, formato, tipo, elaborazione, obbligatorio, descrizione], index) => {

            var posizioneExcel = index + 4

            if (complessita) {
                complessita = complessita.toLowerCase()
            }

            if (
                (!xml || !json || !complessita || !livello || !formato)
            ) {
                throw new Error(`Dati obbligatori mancanti primo foglio Excel alla riga ${posizioneExcel}`)
            }

            if (!isVariableNameValid(json)) {
                throw new Error(`Nome variabile "${json}" primo foglio Excel invalido alla riga ${posizioneExcel}`)
            }

            return { xml, json, complessita, livello, formato, descrizione }
        })
        .sort((a, b) => a.livello.localeCompare(b.livello))

    checkTreeCompleteness(ordered)

    return ordered
}