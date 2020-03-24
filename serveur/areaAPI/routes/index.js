var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about.json', function(req, res, next) {
  res.json(
    {
        "client": {
            "host": req.ip.split(":").pop()
        },
        "server": {
            "current_time": Date.now(),
            "services": [{
                "name": "Twitter",
                "actions": [{
                    "name": "direct message Twitter" ,
                    "description": "I receive a direct twitter message"
                }] ,
                "reactions": [{
                    "name": "Twitting" ,
                    "description": "Updates the authenticating user current status, also known as Tweeting."
                }]
            }, {
                "name": "Gmail",
                "actions": [{
                    "name": "New gmail email" ,
                    "description": "A new email on Gmail"
                }] ,
                " reactions ": [{
                    "name": "Gmail email" ,
                    "description": "Send a new gmail email"
                }]
            }, {
                "name": "Github",
                "actions": [{
                    "name": "New Github repo event" ,
                    "description": "A new event on my repo Github"
                }] ,
                " reactions ": [{
                    "name": "New Github repo" ,
                    "description": "Create a new github Repo"
                }]
            }, {
                "name": "Outlook",
                "actions": [{
                    "name": "New email Outlook event" ,
                    "description": "A new email on my outlook mailbox"
                }, {
                    "name": "New email Outlook with attachement event" ,
                    "description": "A new email on my outlook mailbox has an attachement"
                }] ,
                " reactions ": [{
                    "name": "Outlook email" ,
                    "description": "Send a new outlook email"
                }]
            }, {
                "name": "Timer",
                "actions": [{
                    "name": "Specific day of the week" ,
                    "description": "It is a specific day"
                }, {
                    "name": "Specific day of the week" ,
                    "description": "It is a specific date"
                }, {
                    "name": "Specific hour" ,
                    "description": "It is a specific hour"
                }, {
                    "name": "Do something in x time" ,
                    "description": "Executes the reaction in x time"
                }] ,
                " reactions ": []
            }, {
                "name": "Custom",
                "actions": [] ,
                " reactions ": [{
                    "name": "New custom webhook POST" ,
                    "description": "Webhook POST to any url"
                }, {
                    "name": "New custom webhook GET" ,
                    "description": "Webhook GET to any url"
                }]
            }]
        }
    });
});

module.exports = router;
