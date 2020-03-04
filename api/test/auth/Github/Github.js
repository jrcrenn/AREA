const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/auth/github', async (req, res) => {
    const request = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,delete_repo`
    res.send({ url: request })
})

router.post('/access/github', async (req, res) => {
    const request = 'https://github.com/login/oauth/access_token';

    console.log(req.body.code);
    await axios(request, {
        method: 'POST',
        data: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.body.code
        }
    })
    .then(r => {
        console.log(r.data.split('&'));
        const fragment = r.data.split('&');
        const code = fragment[0].split('=');
        console.log(code[1]);
        res.send({github_token: code[1]})
    })
    .catch(err => {
        res.send('error');
    })
})

module.exports = router;