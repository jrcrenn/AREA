const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/auth/yammer', async (req, res) => {
    const request = `https://www.yammer.com/oauth2/authorize?client_id=${process.env.YAMMER_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:8080/dashboard`
    res.send({ url: request });
});

router.post('/access/yammer', async (req, res) => {
    const request = `https://www.yammer.com/oauth2/access_token?client_id=${process.env.YAMMER_CLIENT_ID}&client_secret=${process.env.YAMMER_CLIENT_SECRET}&code=${req.body.code}&grant_type=authorization_code`

    await axios(request, {
        method: 'POST',
    })
    .then(resp => {
        console.log(resp.data.access_token.token);
        res.send({yammer_token: resp.data.access_token.token})
    })
    .catch(err => {
        console.log(err.toString());
    })
})

module.exports = router;