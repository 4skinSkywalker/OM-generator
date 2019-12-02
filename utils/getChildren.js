module.exports = function(padre, dati) {
    
    return dati
        .filter(figlio => {
            var esprReg = new RegExp(padre.livello + '\.\\d+')
            return figlio.livello.match(esprReg)
        })
}