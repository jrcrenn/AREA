const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/auth/facebook', async (req, res) => {
    const request = `https://www.facebook.com/v6.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:8080/dashboard&response_type=code`;
    res.send({url: request});
});

router.post('/access/facebook', async (req, res) => {
    const request = `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:8080/dashboard&client_secret=${process.env.FACEBOOK_SECRET_ID}&code=${req.body.code}`

    await axios(request, {
        method: 'GET'
    })
        .then(r => {
            console.log(r.data.access_token);
            res.send({ facebook_token: r.data.access_token });
        })
        .catch(err => {
            res.send(err.toString());
        })
});

module.exports = router;