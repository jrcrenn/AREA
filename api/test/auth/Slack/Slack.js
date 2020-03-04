const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/auth/slack', async (req, res) => {
    const request = `https://slack.com/oauth/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=users.profile:read+groups:write+channels:write+channels:read+chat:write:user&redirect_uri=http://localhost:8080/dashboard`;
    res.send({url: request});
});

router.post('/access/slack', async (req, res) => {
    const request = `https://slack.com/api/oauth.access?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&code=${req.body.code}&redirect_uri=http://localhost:8080/dashboard`;

    console.log(req.body.code);
    await axios(request, {
        method: 'POST'
    })
    .then(resp => {
        console.log(resp.data);
        res.send({slack_token: resp.data.access_token});
    })
    .catch(err => {
        res.send(err.toString());
    })
})



module.exports = router;