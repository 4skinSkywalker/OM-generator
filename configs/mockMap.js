
function randomString(maxlength) {

    return function() {
        var letters = 'qwertyuiopasdfghjklzxcvbnm'
        var length = Math.floor(Math.random() * maxlength)
        return [...new Array(length)]
            .map(x => letters[Math.floor(Math.random() * letters.length)])
            .join('')
    }
    
}

function randomNumber(maxlength, isDecimal) {

    return function() {
        return (isDecimal)
            ? Math.random() * 10**maxlength
            : Math.floor(Math.random() * 10**maxlength)
    }

}

function randomDate(start, end) {

    return function() {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            .getTime()
    }
    
}

randomDate()

var typesMap = {
    short: randomString(3),
    string: randomString(10),
    long: randomNumber(20, true),
    integer: randomNumber(10),
    date: randomDate(new Date(1970, 0, 1), new Date()),
    timestamp: randomDate(new Date(1970, 0, 1), new Date()),
    bigdecimal: randomNumber(20, true)
}

typesMap.int = typesMap.integer

module.exports = typesMap