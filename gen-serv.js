var readParams = require('./utils/readParams')
var readDatiIn = require('./utils/readDatiIn')
var readDatiOut = require('./utils/readDatiOut')
var writeOm = require('./utils/writeOm')
var writeFileSystemTree = require('./utils/writeFileSystemTree')

var args = readParams(process.argv)

writeFileSystemTree(args)

var datiInput = readDatiIn(args.file)
var datiOutput = readDatiOut(args.file)

writeOm(args, datiInput, datiOutput)