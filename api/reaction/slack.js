const router = require('express').Router();
const axios = require('axios');

router.post('/slack/create', (req, res) => {
    let token = req.body.token;
    axios({
        method: 'post',
        url: `https://slack.com/api/conversations.create`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            "token": token,
            "name": req.body.name,
            "is_private": false
        }
    }).then((resp)=> {
        console.log(resp);
        
        res.send(`Success: ${req.body.name} created`);
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error")
    })

})

router.post('/slack/send', (req, res) => {
    let token = req.body.token;
    axios({
        method: 'post',
        url: `https://slack.com/api/conversations.list`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((resp)=> {
        let bool = false;
        let channels = resp.data.channels;
        channels.forEach(element => {
            if (element.name === req.body.name) {
                bool = true;
                console.log(element);
                axios({
                    method: 'post',
                    url: `https://slack.com/api/chat.postMessage`,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        "channel": element.id,
                        "text": req.body.message,
                        "as_user": true
                    }
                })
                .then((resp) => {
                    console.log(resp);
                    res.send(`Success`);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send("Error 2")
                })
            }
        });
        if (bool === false) {
            res.send("channel does not exist");
        }    
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error 1")
    })
})

module.exports = router;
