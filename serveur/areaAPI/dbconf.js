var pg = require('pg');

dbClient = new pg.Pool({
    host: 'db',
    user: 'areaapi',
    password: 'toor',
    database: 'area',
    port: 5432
});

module.exports = dbClient;