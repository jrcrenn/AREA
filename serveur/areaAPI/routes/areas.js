var express = require('express');
var router = express.Router();
var dbClient = require('../dbconf');

router.get('/listActions', function(req, res, next) {
    dbClient.query('SELECT * from action', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    });
});

router.get('/listReactions', function(req, res, next) {
    dbClient.query('SELECT * from reaction', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    });
});

module.exports = router;