var fs = require('fs')
var stringToPascalNotation = require('./stringToPascalNotation')
var stringToCamelCaseNotation = require('./stringToCamelCaseNotation')
var indentDescription = require('./indentDescrition')
var checkAndReturnType = require('./checkAndReturnType')
var getChildren = require('./getChildren')
var outputPath = require('../configs/outputPath')
var getTypeDetails = require('./getTypeDetails')

function writeOm(args, datiInput, datiOutput) {

    if (!args) {
        throw new Error('Argomenti mancanti.')
    }

    if (!datiInput || (Array.isArray(datiInput) && !datiInput.length)
     || !datiOutput || (Array.isArray(datiOutput) && !datiOutput.length)) {
        throw new Error('Dati mancanti.')
    }

    var classi = { }
    var INPUT = '_____in_____'
    var OUTPUT = '_____out_____'

    function buildTree(dati, NomePadre) {

        for (var dato of dati) {

            if (dato.visto) {
                continue
            }

            var informazioniTipo = getTypeDetails[dato.complessita]
            var TipoAttributo = checkAndReturnType(dato.formato, informazioniTipo.primitivo)
            
            var attributo = {
                nome: stringToCamelCaseNotation(dato.json),
                descrizione: dato.descrizione,
                tipo: TipoAttributo,
                dettagli: getTypeDetails[dato.complessita]
            }

            var locazione = NomePadre // inizialmente 'Root'
            if (classi[locazione]) {

                var trovato = classi[locazione].find(x => x.nome === attributo.nome)
                if (!trovato) {
                    classi[locazione].push(attributo)
                }
            } else {
                classi[locazione] = [attributo]
            }

            dato.visto = true

            if (!informazioniTipo.primitivo) {

                var figli = getChildren(dato, dati)
                buildTree(figli, TipoAttributo)
            }
        }
    }

    buildTree(datiInput, INPUT)
    buildTree(datiOutput, OUTPUT)

    for (var Classe in classi) {

        var nomeservizio = stringToPascalNotation(args.servizio).toLowerCase()
        var NomeServizio = stringToPascalNotation(args.servizio)
        var nomedominio = stringToPascalNotation(args.dominio).toLowerCase()

        var file = (Classe === INPUT || Classe === OUTPUT)
            ? fs.readFileSync('models/requestResponse', 'utf8')
            : fs.readFileSync('models/classe', 'utf8')

        file = file.replace(/\$autore\$/g, args.autore)
        file = file.replace(/\$nomedominio\$/g, nomedominio)
        file = file.replace(/\$nomeservizio\$/g, nomeservizio)

        if (Classe === INPUT || Classe === OUTPUT) {

            file = file.replace(/\$NomeClasse\$/g, NomeServizio)
            file = file.replace(/\$descrizione\$/g, indentDescription(args.descrizione))
            
            if (Classe === INPUT) {
                file = file.replace(/\$TipoOm\$/g, 'Request')
            } else {
                file = file.replace(/\$TipoOm\$/g, 'Response')
            }
        } else {
            file = file.replace(/\$NomeClasse\$/g, Classe)
        }

        var attributi = ''
        var gettersSetters = ''
        var imports = []

        for (var attributo of classi[Classe]) {
            
            var nomeAttributo = attributo.nome
            var NomeAttributo = stringToPascalNotation(attributo.nome)
            var TipoAttributo = attributo.tipo

            var template = fs.readFileSync(attributo.dettagli.template.campo, 'utf8')
            template = template.replace(/\$nomeAttributo\$/g, nomeAttributo)
            template = template.replace(/\$TipoAttributo\$/g, TipoAttributo)
            template = template.replace(/\$descrizione\$/g, indentDescription(attributo.descrizione))

            attributi += template

            template = fs.readFileSync(attributo.dettagli.template.getterSetter, 'utf8')
            template = template.replace(/\$NomeAttributo\$/g, NomeAttributo)
            template = template.replace(/\$nomeAttributo\$/g, nomeAttributo)
            template = template.replace(/\$TipoAttributo\$/g, TipoAttributo)

            gettersSetters += template

            if ('import' in attributo.dettagli
             && imports.indexOf(attributo.dettagli.import) < 0) {
                imports.push(attributo.dettagli.import)
            }
        }

        file = file.replace(/\$attributi\$/, attributi)
        file = file.replace(/\$gettersSetters\$/, gettersSetters)
        file = file.replace(/\$imports\$/, imports.join('\n'))

        var saveDirectory = outputPath(nomeservizio, true)
    
        var path = (Classe === INPUT)
            ? `${saveDirectory}/${NomeServizio}Request.java`
            : (Classe === OUTPUT)
                ? `${saveDirectory}/${NomeServizio}Response.java`
                : `${saveDirectory}/${Classe}.java`
        
        fs.writeFileSync(path, file)
    }
}

module.exports = writeOm