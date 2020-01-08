module.exports = function(string) {
    return /^([0-9]+\.)+[0-9]+$/.test(string)
}