var fs = require('fs')
var stringToPascalNotation = require('./stringToPascalNotation')
var stringToCamelCaseNotation = require('./stringToCamelCaseNotation')
var indentDescription = require('./indentDescrition')
var checkAndReturnType = require('./checkAndReturnType')
var getChildren = require('./getChildren')
var outputPath = require('../configs/outputPath')
var getTypeDetails = require('./getTypeDetails')

function writeOm(args, datiInput, datiOutput) {

    if (!args)
        throw new Error('Argomenti mancanti.')

    if (!datiInput || (Array.isArray(datiInput) && !datiInput.length) || !datiOutput || (Array.isArray(datiOutput) && !datiOutput.length))
        throw new Error('Dati mancanti.')

    var classi = { }
    var INPUT = '_____in_____'
    var OUTPUT = '_____out_____'

    var nomeservizio = stringToPascalNotation(args.servizio).toLowerCase()
    var NomeServizio = stringToPascalNotation(args.servizio)
    var nomedominio = stringToPascalNotation(args.dominio).toLowerCase()

    function buildTree(dati, Classe) {

        for (var dato of dati) {

            if (dato.visto) continue

            var attributo = {
                nome: dato.json,
                descrizione: dato.descrizione,
                formato: dato.formato,
                complessita: dato.complessita
            }

            var dettagli = getTypeDetails[dato.complessita]

            var locazione = Classe // inizialmente 'Root'
            if (classi[locazione]) {

                var trovato = classi[locazione].find(x => x.nome === attributo.nome)
                if (!trovato) classi[locazione].push(attributo)
            } else {
                classi[locazione] = [attributo]
            }

            dato.visto = true

            if (!dettagli.primitivo) {

                var TipoAttributo = checkAndReturnType(dato.formato, dettagli.primitivo)

                var figli = getChildren(dato, dati)
                buildTree(figli, TipoAttributo)
            }
        }
    }

    buildTree(datiInput, INPUT)
    buildTree(datiOutput, OUTPUT)

    for (var Classe in classi) {

        var file = (Classe === INPUT || Classe === OUTPUT)
            ? fs.readFileSync('models/requestResponse', 'utf8')
            : fs.readFileSync('models/classe', 'utf8')

        file = file.replace(/\$autore\$/g, args.autore)
        file = file.replace(/\$nomedominio\$/g, nomedominio)
        file = file.replace(/\$nomeservizio\$/g, nomeservizio)

        if (Classe === INPUT || Classe === OUTPUT) {

            file = file.replace(/\$NomeClasse\$/g, NomeServizio)
            file = file.replace(/\$descrizione\$/g, indentDescription(args.descrizione))
            
            file = (Classe === INPUT)
                ? file.replace(/\$TipoOm\$/g, 'RequestOm')
                : file.replace(/\$TipoOm\$/g, 'ResponseOm')
        } else {
            file = file.replace(/\$NomeClasse\$/g, Classe)
        }

        var attributi = ''
        var gettersSetters = ''
        var imports = []

        for (var attributo of classi[Classe]) {

            var dettagli = getTypeDetails[attributo.complessita]
            
            var nomeAttributo = stringToCamelCaseNotation(attributo.nome)
            var NomeAttributo = stringToPascalNotation(attributo.nome)
            var TipoAttributo = checkAndReturnType(attributo.formato, dettagli.primitivo)

            var template = fs.readFileSync(dettagli.template.campo, 'utf8')
            template = template.replace(/\$nomeAttributo\$/g, nomeAttributo)
            template = template.replace(/\$TipoAttributo\$/g, TipoAttributo)
            template = template.replace(/\$descrizione\$/g, indentDescription(attributo.descrizione))

            attributi += template

            template = fs.readFileSync(dettagli.template.getterSetter, 'utf8')
            template = template.replace(/\$NomeAttributo\$/g, NomeAttributo)
            template = template.replace(/\$nomeAttributo\$/g, nomeAttributo)
            template = template.replace(/\$TipoAttributo\$/g, TipoAttributo)

            gettersSetters += template

            if ('import' in dettagli) {

                var stringaDiImport = (typeof dettagli.import === "function")
                    ? dettagli.import(attributo.formato)
                    : dettagli.import

                if (stringaDiImport && imports.indexOf(stringaDiImport) < 0)
                    imports.push(stringaDiImport)
            }
        }

        file = file.replace(/\$attributi\$/, attributi)
        file = file.replace(/\$gettersSetters\$/, gettersSetters)
        file = file.replace(/\$imports\$/, imports.join('\n'))

        var saveDirectory = outputPath(nomeservizio, true)
    
        var path = (Classe === INPUT)
            ? `${saveDirectory}/${NomeServizio}RequestOm.java`
            : (Classe === OUTPUT)
                ? `${saveDirectory}/${NomeServizio}ResponseOm.java`
                : `${saveDirectory}/${Classe}.java`
        
        fs.writeFileSync(path, file)
    }

    console.log(`
#  '██████╗'███╗'''███╗'''''██████╗'██╗''██╗
#  ██╔═══██╗████╗'████║''''██╔═══██╗██║'██╔╝
#  ██║'''██║██╔████╔██║''''██║'''██║█████╔╝'
#  ██║'''██║██║╚██╔╝██║''''██║'''██║██╔═██╗'
#  ╚██████╔╝██║'╚═╝'██║''''╚██████╔╝██║''██╗
#  '╚═════╝'╚═╝'''''╚═╝'''''╚═════╝'╚═╝''╚═╝
#  '''''''''''''''''''''''''''''''''''''''''

Directory di destinazione /${outputPath(nomeservizio, true)}
`
    )

}

module.exports = writeOm
