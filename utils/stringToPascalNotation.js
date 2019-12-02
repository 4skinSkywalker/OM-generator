module.exports = function(string) {
    
    var parole = string.split(' ')

    return (parole.length === 1)
        ? parole[0][0].toUpperCase() + parole[0].slice(1)
        : parole
            .map(parola => parola.toLowerCase())
            .map(parola => parola[0].toUpperCase() + parola.slice(1))
            .join('');
}