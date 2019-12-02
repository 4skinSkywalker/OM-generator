module.exports = function(nomeservizio, stringFlag) {
    
    var dirs = ['dist', nomeservizio, 'om']
    return (stringFlag)
        ? dirs.join('/')
        : dirs
}