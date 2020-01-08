var XLSX = require('xlsx')
var sheet2array = require('./sheet2array')
var checkTreeCompleteness = require('./checkTreeCompleteness')
var isVariableNameValid = require('./isVariableNameValid')

module.exports = function(file) {
    
    var workbook = XLSX.readFile(file)
    var secondSheet = workbook.SheetNames[1]
    var worksheet = workbook.Sheets[secondSheet]

    var ordered = sheet2array(worksheet)
        .map(([vuoto, json, xml, complessita, livello, formato, tipo, elaborazione, obbligatorio, descrizione], index) => { 

            var posizioneExcel = index + 4

            if (complessita) {
                complessita = complessita.toLowerCase()
            }

            if (
                (!json || !complessita || !livello || !formato)
            ) {
                throw new Error(`Dati obbligatori mancanti secondo foglio Excel alla riga ${posizioneExcel}`)
            }

            if (!isVariableNameValid(json)) {
                throw new Error(`Nome variabile "${json}" secondo foglio Excel invalido alla riga ${posizioneExcel}`)
            }

            descrizione = descrizione && descrizione
                .split('\n')
                .map((w, i) => {
                    if (i === 0) {
                        return '' + w
                    }
                    return ' *  ' + w
                })
                .join('\n')

            if (!/^([0-9]+\.)+[0-9]+$/.test(livello)) {
                throw new Error(`Livello è invalido "${livello}" secondo foglio Excel invalido alla riga ${posizioneExcel}`)
            }
            
            livello = livello
                .split('.')
                .map(n => n.padStart(3, 0))
                .join('.')

            return {
                xml,
                json,
                complessita,
                livello,
                formato: formato.toLowerCase(),
                descrizione: descrizione
            }
        })
        .sort((a, b) => a.livello.localeCompare(b.livello))

    // console.log(ordered)

    checkTreeCompleteness(ordered)

    return ordered
}
