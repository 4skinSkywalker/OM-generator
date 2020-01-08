function isStrictlyIncreasing(a, b) {

    var prefixA = +a.slice(0, -1).join('')
    var prefixB = +b.slice(0, -1).join('')
    var suffixA = a.slice(-1)[0]
    var suffixB = b.slice(-1)[0]

    if (a.length < b.length - 1) return false

    if (a.length === b.length
    && (prefixA != prefixB || suffixA != suffixB - 1))
        return false

    if (a.length === b.length - 1
    && (+a.join('') != prefixB || suffixB != 1))
        return false

    return true

}

function treePrefix2array(string) {
    return string.split('.').map(s => +s)
}

module.exports = function(dati) {

    dati.reduce((a, b) => {

        var prev = treePrefix2array(a.livello)
        var curr = treePrefix2array(b.livello)

        // console.log(prev, curr)

        if (!isStrictlyIncreasing(prev, curr))
            throw new Error(`L'alberatura degli attributi è rotta in ${a.json}" -> "${b.json}`)

        return b

    })
    
}