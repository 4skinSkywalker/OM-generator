module.exports = function(padre, dati) {
    return dati.filter(figlio => 
        figlio.livello.match(new RegExp(padre.livello + '\.\\d+'))
    )
}