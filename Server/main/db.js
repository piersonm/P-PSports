const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '&lex&nder',
    port: 5432
})

module.exports = pool