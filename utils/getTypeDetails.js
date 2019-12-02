var modelsFolder = 'models/'

module.exports = {
    c: {
        template: {
            campo: `${modelsFolder}primitivo`,
            getterSetter: `${modelsFolder}getterSetterPrimitivo`,
        }
    },
    l: {
        template: {
            campo: `${modelsFolder}lista`,
            getterSetter: `${modelsFolder}getterSetterLista`
        },
        import: 'import java.util.List;',
    },
    m: {
        template: {
            campo: `${modelsFolder}mappa`,
            getterSetter: `${modelsFolder}getterSetterMappa`
        },
        import: 'import java.util.Map;'
    },
    s: {
        template: {
            campo: `${modelsFolder}primitivo`,
            getterSetter: `${modelsFolder}getterSetterPrimitivo`
        },
        primitivo: true
    }
}