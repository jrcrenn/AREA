var express = require('express');
var router = express.Router();
var dbClient = require('../dbconf');
var oauth2Client = require("../config/googleOauth2")
var coreLaunch = require("../core/core")
const fetch = require('node-fetch');
const twitterWebhooks = require('twitter-webhooks');

router.post('/twitter', function (req, res) {
    console.log(req.body)
})

router.post('/github', function (req, res) {
    console.log(req.body)
    var action_type = req.body.action
    var repository = req.body.repository.name
    var sender = req.body.sender.login

    console.log("action_type :" + action_type)
    console.log("repository :" + repository)
    console.log("sender :" + sender)

    dbClient.query("SELECT * FROM users WHERE token_event_gh = $1", [sender], function(err, result) {
        if (result.rows.length > 0) {
            console.log("User :")
            console.log(result.rows[0])
            coreLaunch(result.rows[0].user_id, "Github", 3, repository, "A new event of the type : " + action_type, repository)
        } else {
            console.log("User not found, aborted")
        }
    })

    res.status(200).json({})
})

router.post('/gmail', function (req, res) {
    const message = Buffer.from(req.body.message.data, 'base64').toString(
        'utf-8'
    );
    console.log(JSON.parse(message))
    dbClient.query("SELECT * FROM users WHERE token_event_gmail = $1", [JSON.parse(message).emailAddress], function(err, result) {
        if (result.rows.length > 0) {
            fetch("https://www.googleapis.com/gmail/v1/users/me/messages?format=minimal,", {method:"GET",headers:{Authorization: "Bearer " + result.rows[0].token_gmail}})
            .then(re => re.json())
            .then((json) => {
                console.log("Last mail : " + json.messages[0].id)
                fetch("https://www.googleapis.com/gmail/v1/users/me/messages/" + json.messages[0].id, {method:"GET",headers:{Authorization: "Bearer " + result.rows[0].token_gmail}})
                .then(re => re.json())
                .then((json2) => {
                    var mail = ""
                    json2.payload.headers.map((element) => {
                        if (element.name == "From") {
                            mail = element.value
                        }
                    })
                    res.status(200).json({})
                    if (JSON.stringify(json2.labelIds).includes("SENT") || JSON.stringify(json2.labelIds).includes("DRAFT") || !JSON.stringify(json2.labelIds).includes("UNREAD")) {
                        console.log("no gmail")
                    } else {
                        coreLaunch(result.rows[0].user_id, "Gmail", 2, json2.snippet, mail, mail)
                    }
                })
            })
        }
    })
});

router.post('/outlook', async function(req, res) {
    if (req.query.validationToken) {
        res.send(req.query.validationToken)
        return;
    } else {
        // console.log(req.body.value[0].resourceData);
        // console.log(req.body);
        res.send("OK")
        var result = await dbClient.query("SELECT * FROM users WHERE token_event_ol=$1", [req.body.value[0].subscriptionId])
        if (!result.rows.length)
        return;
        var mail = await getOutlookMail(req.body.value[0].resourceData.id, result.rows[0].token_ol)
        var exe = coreLaunch(result.rows[0].user_id, "Outlook", 5, mail.body, mail.from, mail.attachement)
        if (exe == 1)
            coreLaunch(result.rows[0].user_id, "Outlook", 4, mail.body, mail.from, mail.from)
    }
});

async function getOutlookMail(mailId, tokenOutlook) {
    var qRes = await fetch("https://graph.microsoft.com/v1.0/me/messages/" + mailId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + tokenOutlook
        }
    });
    parsed = await qRes.json();
    console.log("---------------------------------------------------------\n")
    console.log(parsed)
    console.log("---------------------------------------------------------\n")
    if (parsed.error)
        return ({"from": "", "subject": "", "body": "", "attachement": ""});
    return ({"from": parsed.from.emailAddress.address, "subject": parsed.subject, "body": parsed.bodyPreview, "attachement": parsed.hasAttachments})
}

router.get('/facebook', async function(req, res) {
    if (req.query["hub.challenge"]) {
        res.send(req.query["hub.challenge"])
        return;
    }
});

router.post('/facebook', async function(req, res) {
    console.log(req.body)
    console.log(req.body.entry[0].changed_fields)
    res.status(200).json()
});

router.post('/youtube', async function(req, res) {
    console.log(req.body)
    res.status(200).json();
});

router.get('/timer', async function(req, res) {
    var id = req.query.id;
    var areaId = req.query.areaId;
    var type = req.query.type
    var param = req.query.param
    var action = 0
    console.log(id, areaId, type)
    res.sendStatus(200)
    var result = await dbClient.query("SELECT user_id FROM users WHERE token_event_timer=$1", [id])
    console.log(id)
    if (type == 1)
        action = 6;
    else if (type == 2)
        action = 7
    else if (type == 3)
        action = 8;
    else if (type == 4)
        action = 9;
    coreLaunch(result.rows[0].user_id, "Timer", action, param, '', param)
});

module.exports = router;