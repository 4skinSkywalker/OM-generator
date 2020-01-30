var deepCopy = require('./utils/deepCopy')
var readDatiIn = require('./utils/readDatiIn')
var readDatiOut = require('./utils/readDatiOut')
var resReqMock = require('./models/reqRes-mock')
var getChildren = require('./utils/getChildren')
var getTypeDetails = require('./utils/getTypeDetails')
var mockMap = require('./configs/mockMap')
var checkAndReturnType = require('./utils/checkAndReturnType')
var fs = require('fs')

var filepath = [...process.argv].pop()

if (!/\.xlsx$/.test(filepath)) {
    throw new Error('File format is invalid, only ".xlsx" is accepted.')
}

var input = {
    dati: readDatiIn(filepath),
    object: deepCopy(resReqMock)
}

var output = {
    dati: readDatiOut(filepath),
    object: deepCopy(resReqMock)
}

function buildTree(dati, object) {

    for (var d of dati) {
        if (d.visto) continue

        var dettagli = getTypeDetails[d.complessita]

        d.visto = true

        var mock = null
        if (dettagli.primitivo) {

            // Estraggo il tipo dal formato
            // se formato non è in mappa allora lancio un'eccezione
            var tipo = checkAndReturnType(d.formato, true)
                .toLowerCase()

            // Se l'utente ha defino un mock assegnalo
            // altrimenti genera mock randomico
            mock = (d.mock)
                ? (['long', 'integer', 'bigdecimal', 'timestamp'].includes(tipo))
                    ? +d.mock
                    : d.mock
                : mockMap[tipo]()

            // Assegno il mock alla proprietà
            object[d.json] = mock
        } else {

            // Estraggo il tipo dal formato
            // se formato non è in mappa allora tipo è null
            var tipo = checkAndReturnType(d.formato, false, true)
            if (tipo) {
                tipo = tipo.toLowerCase()
            }

            // Se tipo è definito e complessità è l (lista) 
            if (tipo && d.complessita === 'l') {

                // Se l'utente ha defino un mock assegnalo
                // altrimenti genera mock randomico
                mock = (d.mock)
                    ? (['long', 'integer', 'bigdecimal', 'timestamp'].includes(tipo))
                        ? +d.mock
                        : d.mock
                    : mockMap[tipo]()
            }

            object[d.json] = (d.complessita === 'l')
                ? (mock)
                    ? [ mock ]
                    : [ {} ]
                : {}

            var parent = (d.complessita === 'l')
                ? object[d.json][0]
                : object[d.json]
        }

        // Se non esiste mock, allora l'oggetto è complesso (da popolare)
        if (!mock) {
            buildTree(getChildren(d, dati), parent)
        }
    }

}

buildTree(input.dati, input.object.payload)
buildTree(output.dati, output.object.payload)

var requestPath = `${filepath}.request.mock.json`
var responsePath = `${filepath}.response.mock.json`

fs.writeFileSync(requestPath, JSON.stringify(input.object, null, 2))
fs.writeFileSync(responsePath, JSON.stringify(output.object, null, 2))

console.log(`
#  '██████╗'██╗''██╗
#  ██╔═══██╗██║'██╔╝
#  ██║'''██║█████╔╝'
#  ██║'''██║██╔═██╗'
#  ╚██████╔╝██║''██╗
#  '╚═════╝'╚═╝''╚═╝
#  '''''''''''''''''

Generati ${requestPath} e ${responsePath}
`
)
