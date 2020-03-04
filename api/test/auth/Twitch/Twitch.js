const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/auth/twitch', async (req, res) => {
    const request = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=http://localhost:8080/dashboard&response_type=code&scope=user:edit+user:read:email+channel:read:subscriptions`
    res.send({url: request});
})

router.post('/access/twitch', async (req, res) => {
    const request = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.body.code}&grant_type=authorization_code&redirect_uri=http://localhost:8080/dashboard`

    console.log(req.body.code);
    await axios(request, {
        method: 'POST',
    })
    .then(r => {
        console.log(r.data);
        res.send({twitch_token: r.data.access_token});
    })
    .catch(err => {
        console.log(err.toString());
    })
})

module.exports = router;