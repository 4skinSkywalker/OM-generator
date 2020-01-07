var typesMap = {
    short: {
        nome: 'String'
    },
    string: {
        nome: 'String'
    },
    long: {
        nome: 'Long'
    },
    integer: {
        nome: 'Integer'
    },
    date: {
        nome: 'Date',
        import: 'import java.util.Date;'
    },
    timestamp: {
        nome: 'Timestamp',
        import: 'import java.sql.Timestamp;'
    },
    bigdecimal: {
        nome: 'BigDecimal',
        import: 'import java.util.BigDecimal;'
    }
}

typesMap.int = typesMap.integer

module.exports = typesMap