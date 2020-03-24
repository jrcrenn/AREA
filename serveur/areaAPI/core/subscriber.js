var express = require('express');
var router = express.Router();
var app = require('../app');
var dbClient = require('../dbconf');
const fetch = require('node-fetch');
const twitterWebhooks = require('twitter-webhooks');
var GitHub = require('github-api');

function subscribeToFacebook(userId, idAction) {
    console.log("aaaaaaa")
}

async function subscribeToTwitter(userId, idAction) {
    const results = await dbClient.query('SELECT * FROM users WHERE user_id = $1', [userId])
    const token_twitter = results.rows[0].token_tw;

    const accessToken = String(token_twitter).split(";")[0];
    const accessTokenSecret = String(token_twitter).split(";")[1];

    console.log(accessToken)
    console.log(accessTokenSecret)

    
    //userActivityWebhook.register();

    // userActivityWebhook.subscribe({
    //     userId: '[TWITTER USER ID]',
    //     accessToken: accessToken,
    //     accessTokenSecret: accessTokenSecret
    // })
    // .then(function (userActivity) {
    //     userActivity
    //     .on ('favorite', (data) => console.log (userActivity.id + ' - favorite'))
    //     .on ('tweet_create', (data) => console.log (userActivity.id + ' - tweet_create'))
    //     .on ('follow', (data) => console.log (userActivity.id + ' - follow'))
    //     .on ('mute', (data) => console.log (userActivity.id + ' - mute'))
    //     .on ('revoke', (data) => console.log (userActivity.id + ' - revoke'))
    //     .on ('direct_message', (data) => console.log (userActivity.id + ' - direct_message'))
    //     .on ('direct_message_indicate_typing', (data) => console.log (userActivity.id + ' - direct_message_indicate_typing'))
    //     .on ('direct_message_mark_read', (data) => console.log (userActivity.id + ' - direct_message_mark_read'))
    //     .on ('tweet_delete', (data) => console.log (userActivity.id + ' - tweet_delete'))
    // });

}



async function subscribeToGmail(userId, idAction) {
    const results = await dbClient.query('SELECT * FROM users WHERE user_id = $1', [userId])
    const token_gmail = results.rows[0].token_gmail;

    console.log(token_gmail)
    fetch("https://www.googleapis.com/gmail/v1/users/me/profile", {method:"GET",headers:{Authorization:"Bearer " + token_gmail}})
    .then(res1 => res1.json())
    .then((res2) => {
        const email = res2.emailAddress
        if (email == null) {
            console.log("Subscription Gmail error")
            return
        }
        console.log(email)
        dbClient.query('UPDATE users SET token_event_gmail = $1 WHERE user_id = $2;', [email, userId], function(err, result) {
            if (err != null) {
                console.log("error: " + err)
            }
            fetch("https://www.googleapis.com/gmail/v1/users/me/watch", {
                method:"POST",
                headers:{
                    "Authorization":"Bearer " + token_gmail,
                    "Content-Type":"application/json"
                }, body:JSON.stringify({
                    "topicName": "projects/area-epitech-266014/topics/topic2",
                    "labelIds": ["INBOX", "UNREAD"]
                })}
            )
            .then(resSub => resSub.json())
            .then(json => {
                console.log(json)
                if (json.error) {
                    console.log("error: " + json.error)
                    return
                }
                console.log("Subscription Gmail done")
            })
        })
        
    })
}

async function subscribeToGithub(userId, idAction, param1) {
    const user = await dbClient.query('SELECT * FROM users WHERE user_id = $1', [userId])
    const token_github = user.rows[0].token_gh;

    var gh_user = await fetch("https://api.github.com/user", {method:"GET",headers:{Authorization:"Token " + token_github}})
    gh_user = await gh_user.json()
    console.log("login :" + gh_user.login)

    dbClient.query('UPDATE users SET token_event_gh = $1 WHERE user_id = $2;', [gh_user.login, userId], function(err, result) {
        if (err != null) {
            console.log("error: " + err)
        }
    })

    var subscriptions = await fetch("https://api.github.com/repos/" + gh_user.login + "/" + param1 + "/hooks", {method:"GET",headers:{Authorization:"Token " + token_github}})
    subscriptions = await subscriptions.json()
    console.log("Github Existings subscriptions :")
    console.log(subscriptions)
    if (subscriptions.length > 0) {
        console.log("Webhook already existing on Github")
        return
    }
    var new1 = await fetch("https://api.github.com/repos/" + gh_user.login + "/" + param1 + "/hooks", { method: 'POST', body: JSON.stringify({
        "name": "web",
        "active": true,
        "events": [
          "push",
          "pull_request",
          "issues",
          "star"
        ],
        "config": {
          "url": "https://area.pinteed.com/webhook/github",
          "content_type": "json",
          "insecure_ssl": "0"
        }
    }), headers:{Authorization:"Token " + token_github}})
    new1 = await new1.json()
    console.log(new1)
}

async function subscribeToOutlook(userId, actionId) {
    try {
        var result = await dbClient.query("SELECT token_ol FROM users WHERE user_id=$1", [userId]);
        var tmp = new Date()
        console.log(new Date(tmp.getTime() + 4200 * 60000).toISOString())
        var qRes = await fetch("https://graph.microsoft.com/v1.0/subscriptions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + result.rows[0].token_ol,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "changeType": "created,updated",
                "notificationUrl": "https://area.pinteed.com/webhook/outlook",
                "resource": "/me/mailFolders('inbox')/messages",
                "expirationDateTime": new Date(tmp.getTime() + 4200 * 60000).toISOString(),
                "clientState": "NotificationOutlook",
                "latestSupportedTlsVersion": "v1_2"
            })
        });
        parsed = await qRes.json()
        console.log(parsed);
        try {
            await dbClient.query("UPDATE users SET token_event_ol=$1 WHERE user_id=$2", [parsed.id, userId])
            console.log("token_event_ol registered successfully for user " + userId)
        } catch (error) {
            console.log(error.stack)
        }
    } catch (error) {
        console.log(error.stack);
    }
}

async function subscribeToTimer(userId, actionId, areaId) {
    var d = "&";
    var res = await dbClient.query("SELECT actionParam1 FROM areas WHERE id=$1", [areaId])
    if (res.rows[0].actionparam1.includes("/"))
        d = d + "date=" + res.rows[0].actionparam1;
    else if (res.rows[0].actionparam1.includes(":"))
        d = d + "hour=" + res.rows[0].actionparam1;
    else if (isNaN(res.rows[0].actionparam1))
        d = d + "day=" + res.rows[0].actionparam1;
    else
        d = d + "later=" + String(res.rows[0].actionparam1);
    var response = await fetch("https://area.pinteed.com/services/timer/subscribe?id=" + areaId + d, {
        method: "GET"
    });
    console.log(response)
    var parsed = await response.json()
    await dbClient.query("UPDATE users SET token_event_timer=$1 WHERE user_id=$2", [parsed.subId, userId])
}

function subscriber(userId, actionId, param1, areaId) {
    dbClient.query('SELECT * FROM action WHERE id = $1', [actionId], (err, result) => {
        if (err) {
            console.log(err.stack)
            return
        }
        if (result.rows.length != 1) {
            console.log("Fatal error")
            return
        }
        const service = result.rows[0].servicename
        if (service == "Facebook") {
            subscribeToFacebook(userId, result.rows[0].id)
        } else if (service == "Gmail") {
            subscribeToGmail(userId, result.rows[0].id)
        } else if (service == "Outlook") {
            subscribeToOutlook(userId, result.rows[0].id)
        } else if (service == "Twitter") {
            subscribeToTwitter(userId, result.rows[0].id)
        } else if (service == "Timer") {
            subscribeToTimer(userId, result.rows[0].id, areaId)
        } else if (service == "Github") {
            subscribeToGithub(userId, result.rows[0].id, param1)
        } else {
            console.log("Fatal error")
            return
        }
    });
}

module.exports = subscriber;
