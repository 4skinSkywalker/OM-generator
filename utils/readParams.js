var mandatoryParams = require('../configs/mandatoryParams')

module.exports = function(args) {

    return mandatoryParams.reduce((result, parameter) => {

        var prefixed = '-' + parameter
        var index = args.indexOf(prefixed)

        if (index < 0)
            throw new Error(`Parametro ${prefixed} obbligatorio.`)

        return Object.assign(result, { [parameter]: args[index + 1] })

    }, {})

}