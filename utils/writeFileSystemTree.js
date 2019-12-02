var fs = require('fs')
var stringToPascalNotation = require('./stringToPascalNotation')
var outputPath = require('../configs/outputPath')

module.exports = function(args) {

    var nomeservizio = stringToPascalNotation(args.servizio).toLowerCase()

    var dirs = outputPath(nomeservizio)

    var saveDirectory = dirs[0]
    for (var i = 1; i <= dirs.length; i++) {
        if (!fs.existsSync(saveDirectory)) {
            fs.mkdirSync(saveDirectory)
        }
        if (i < dirs.length) {
            saveDirectory = saveDirectory + '/' + dirs[i]
        }
    }

    var files = fs.readdirSync(saveDirectory)
    for (var file of files) {
        fs.unlinkSync(saveDirectory + '/' + file)
    }
}