function semantic2number(string) {

    return string.replace(/\./g, '')
}

module.exports = function(dati) {

    var isValid = true
    var errorDetail = [null, null]
    for (var i = 1; i < dati.length; i++) {

        var prev = semantic2number(dati[i - 1].livello)
        var curr = semantic2number(dati[i].livello)

        if (
            (prev.length === curr.length && +prev !== curr - 1)
         || (prev.length < curr.length - 1)
         || (prev.length === curr.length - 1 && prev * 10 + 1 !== +curr)
        ) {
            isValid = false
            errorDetail = `"${dati[i - 1].json}" -> "${dati[i].json}"`
            break
        }
    }
    
    if (!isValid) {
        throw new Error(`L'alberatura degli attributi è rotta in ${errorDetail}`)
    }
}