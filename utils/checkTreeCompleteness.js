function isStrictlyIncreasing(a, b) {

    var prefixA = +a.slice(0, -1).join('')
    var prefixB = +b.slice(0, -1).join('')
    var suffixA = a.slice(-1)[0]
    var suffixB = b.slice(-1)[0]

    if (a.length < b.length - 1) {
        return false
    }

    if (a.length === b.length
    && (prefixA != prefixB || suffixA != suffixB - 1)) {
        return false
    }

    if (a.length === b.length - 1
    && (+a.join('') != prefixB || suffixB != 1)) {
        return false
    }

    return true

}

function semantic2array(string) {

    return string
        .split('.')
        .map(s => +s)

}

module.exports = function(dati) {

    var isValid = true
    var errorDetail = [null, null]
    for (var i = 1; i < dati.length; i++) {
        var prev = semantic2array(dati[i - 1].livello)
        var curr = semantic2array(dati[i].livello)

        // console.log(prev, curr)

        if (!isStrictlyIncreasing(prev, curr)) {
            throw new Error(`L'alberatura degli attributi è rotta in ${dati[i - 1].json}" -> "${dati[i].json}`)
        }
    }
    
}