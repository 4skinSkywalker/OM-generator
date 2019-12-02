var XLSX = require('xlsx')

module.exports = function(sheet){

    var result = []
    var range = XLSX.utils.decode_range(sheet['!ref'])
    for(var rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
        var row = []
        for(var colNum=range.s.c; colNum <= range.e.c; colNum++){
            var nextCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: colNum})]
            if(nextCell){
                row.push(nextCell.w)
            } else {
                row.push(undefined)
            }
        }
        result.push(row)
    }

    return result
        .slice(2)
        .map(row => row.map(cell => cell && cell.trim()))
        .filter(row => !row.every(cell => !cell))
}