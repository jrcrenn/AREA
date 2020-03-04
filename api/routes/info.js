const router = require('express').Router();

const verify = require('./verifyToken');

router.get('/registered', verify, (req, res) => {
    const github = 'false';
    const epitech = 'false';

    
})