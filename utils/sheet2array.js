var XLSX = require('xlsx')

module.exports = function(sheet){

    var result = []
    var range = XLSX.utils.decode_range(sheet['!ref'])
    for(var rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
        var row = []
        for(var colNum=range.s.c; colNum <= range.e.c; colNum++){
            var nextCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colNum})]
            row.push(
                (nextCell)
                    ? nextCell.w
                    : undefined
            )
        }
        result.push(row)
    }

    var startPoint = result.findIndex(row => row[0] === 'ROOT')

    if (!startPoint)
        throw new Error(`Definire la radice del servizio con la parola "ROOT"`)

    return result
        .slice(startPoint + 1)
        .map(row => row.map(cell => cell && cell.trim()))
        .filter(row => !row.every(cell => !cell))

}