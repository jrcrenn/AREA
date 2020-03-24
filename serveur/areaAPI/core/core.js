const fetch = require('node-fetch');
var Base64 = require('js-base64').Base64;
var Twitter = require('twitter');

async function getGmailAdress(token) {
    var res = await fetch("https://www.googleapis.com/gmail/v1/users/me/profile", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        }
    });
    var parsed = await res.json();
    console.log(parsed)
    return (parsed.emailAddress);
}

async function executeGmail(userId, reactionId, actionId, var1, var2, token, tokenEvent) {
    console.log("   Gmail Reaction with")
    console.log("       var1 :" + var1)
    console.log("       var2 :" + var2)
    if (reactionId == 2) {
        let email = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", var2, "\n",
            "from: ", tokenEvent, "\n",
            "subject: ", "Receive From AREA", "\n\n",
            var1
        ].join('');
        var base64EncodedEmail = Base64.encodeURI(email);

        fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", 
        {
            method:"POST",
            headers:{
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                raw : base64EncodedEmail
            })
        })
        .then(re => re.json())
        .then((json) => {
            console.log(json)
        })
    }
}

async function executeGithub(userId, reactionId, actionId, var1, var2, token, tokenEvent) {
    console.log("   Github  Reaction with")
    console.log("       var1 :" + var1)
    console.log("       var2 :" + var2)
    if (reactionId == 3) {
        var new1 = await fetch("https://api.github.com/user/repos", { method: 'POST', body: JSON.stringify({
            "name": var1,
        }), headers:{Authorization:"Token " + token}})
        new1 = await new1.json()
        console.log(new1)
    }
}

async function executeCustom(userId, reactionId, actionId, var1, var2) {
    console.log("   Custom  Reaction with")
    console.log("       var1 :" + var1)
    console.log("       var2 :" + var2)
    if (reactionId == 4) {
        var new1 = await fetch(var1, { method: 'POST', body: var2})
        console.log(new1)
    }
    if (reactionId == 5) {
        var new1 = await fetch(var1, { method: 'GET', headers: var2})
        console.log(new1)
    }
}

async function executeTwitter(userId, reactionId, actionId, var1, var2, token_tw, token_event_tw) {
    console.log("   Twitter  Reaction with :")
    console.log("       var1 :" + var1)
    console.log("       var2 :" + var2)
    console.log(reactionId);
    if (reactionId == 1) {
        console.log(reactionId);
        var client = new Twitter({
            consumer_key: 'MW3cKr6DLgbZwMepm7olGp3cd',
            consumer_secret: '6AJPaPAa0Qr7XIk3o0WDaeJ5k1s8p9NyrJBq3HX4WHoIQ3SqRu',
            access_token_key: String(token_tw).split(";")[0],
            access_token_secret: String(token_tw).split(";")[1]
        });
        client.post('statuses/update', {status: var1}, function(error, tweet, response) {
            if (error != null) {
                console.log("error");
                console.log(error);
            } else {
                console.log(tweet);
                console.log("OK");
            }
        });
    }
}

async function executeOutlook(userId, reactionId, actionId, var1, var2, token_ol) {
    console.log("   Outlook  Reaction with :")
    console.log("       var1 :" + var1)
    console.log("       var2 :" + var2)
    console.log(reactionId);
    if (reactionId == 6) {
        await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token_ol,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "message": {
                    "subject": "Sent from AREA",
                    "body": {
                        "contentType": "Text",
                        "content": var1
                    },
                    "toRecipients": [
                        {
                            "emailAddress": {
                                "address": var2
                            }
                        }
                    ]
                },
            })
        });
    }
}

function parseWithVar(toParse, var1, var2){
    if (toParse == null) {
        return (null)
    }
    var temp = toParse.replace("{{actionVariable2}}",var2)
    temp = temp.replace("{{actionVariable1}}",var1)
    return (temp)
}

async function coreLaunch(userId, serviceName, actionId, var1, var2, param1) {
    console.log("New Core with args:")
    console.log("   userId:" + userId)
    console.log("   serviceName:" + serviceName)
    console.log("   actionId:" + actionId)
    console.log("   var1:" + var1)
    console.log("   var2:" + var2)
    console.log("   param1:" + param1)
    dbClient.query('SELECT * FROM areas WHERE (user_id = $1 AND action_id = $2 AND activated = 1)', [userId, actionId], async (err, result) => {
        if (result.rows.length < 1) {
            console.log("No action to execute")
            return (1)
        }
        console.log("Nb Area to take care of : " + result.rows.length)
        result.rows.map((element) => {
            console.log("id : " + element.id + " reaction_id : " + element.reaction_id)
            dbClient.query('SELECT * FROM reaction WHERE id = $1', [element.reaction_id], (err, result2) => {
                if (result2.rows.length == 1) {
                    console.log(element)
                    if (param1 != "*" && element.actionparam1 != "*") {
                        if (!String(param1).includes(String(element.actionparam1))) {
                            console.log("param1 != result.actionParam1")
                            console.log("param1 : " + param1)
                            console.log("result.actionParam1 : " + element.actionparam1)
                            console.log(String(param1).includes(String(element.actionparam1)))
                            return (1)
                        }
                    }
                    const serviceName = result2.rows[0].servicename
                    console.log(serviceName)
                    var reactionParam1 = parseWithVar(element.reactionparam1, var1, var2)
                    var reactionParam2 = parseWithVar(element.reactionparam2, var1, var2)
                    dbClient.query("SELECT * FROM users WHERE user_id = $1", [userId], async function(err, result3) {
                        
                        if (result3.rows.length == 1) {
                            const user = result3.rows[0]

                            // execute functions
                            if (serviceName == "Gmail") {
                                if (user.token_event_gmail == null) {
                                    var gmailAddress = await getGmailAdress(user.token_gmail);
                                    executeGmail(userId, element.reaction_id, actionId, reactionParam1, reactionParam2, user.token_gmail, gmailAddress)
                                } else
                                    executeGmail(userId, element.reaction_id, actionId, reactionParam1, reactionParam2, user.token_gmail, user.token_event_gmail)
                            }

                            if (serviceName == "Github") {
                                executeGithub(userId, element.reaction_id, actionId, reactionParam1, reactionParam2, user.token_gh, user.token_event_gh)
                            }

                            if (serviceName == "Twitter") {
                                executeTwitter(userId, element.reaction_id, actionId, reactionParam1, reactionParam2, user.token_tw, user.token_event_tw)
                            }

                            if (serviceName == "Custom") {
                                executeCustom(userId, element.reaction_id, actionId, reactionParam1, reactionParam2)
                            }

                            if (serviceName == "Outlook") {
                                executeOutlook(userId, element.reaction_id, actionId, reactionParam1, reactionParam2, user.token_ol)
                            }

                            dbClient.query('INSERT INTO historique(user_id, reaction_id, description, time) values ($1, $2, $3, $4) ', [userId, element.reaction_id, element.description, new Date()], (error, result) => {
                                if (err) {
                                    console.log("Save History failed")
                                } else {
                                    console.log("Save History")
                                }
                            })

                        } else {
                            console.log("fatal error")
                        }
                    })
                } else {
                    console.log("   Fatal error, reaction not found")
                }
            })
        })
    })
}

module.exports = coreLaunch;