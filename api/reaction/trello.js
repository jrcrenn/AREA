const router = require('express').Router();
const request = require('request');

const dotenv = require('dotenv');
dotenv.config();


function getMemberId(token, name, ) {
    return new Promise(resolve => {
        setTimeout(() => {
            var options = {
                method: 'GET',
                url: `https://api.trello.com/1/members/${name}`,
                qs: {fields: ['id', 'name'], key: process.env.TRELLO_API_KEY, token: token},
                headers: {'content-type': 'application/json'}
            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    resolve(null);
                }
                else {
                    var bopa = JSON.parse(body);                    
                    resolve(bopa.id);
                }
            })            
        }, 5000);
    })
};

function getBoardId(token, name, memberId) {
    console.log(name);
    
    return new Promise(resolve => {
        setTimeout(() => {
            var options = {
                method: 'GET',
                url: `https://api.trello.com/1/members/${memberId}/boards`,
                qs: {
                  filter: 'all',
                  fields: 'all',
                  lists: 'none',
                  memberships: 'none',
                  organization: 'false',
                  organization_fields: 'name,displayName',
                  key: process.env.TRELLO_API_KEY,
                  token: token
                }
            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    resolve(null);
                }
                else {
                    var bopa = JSON.parse(body);
                    bopa.forEach(element => {
                        if (element.name === name) {
                            resolve(element.id);
                        }
                    });
                }
            })
        }, 5000);
    })
}


router.post("/trello/board/create", (req, res) => {
    var options = {
        method: "POST",
        url: 'https://api.trello.com/1/boards/',
        qs: {
            name: req.body.name,
            defaultLabels: 'true',
            defaultLists: 'true',
            keepFromSource: 'none',
            prefs_permissionLevel: 'private',
            prefs_voting: 'disabled',
            prefs_comments: 'members',
            prefs_invitations: 'members',
            prefs_selfJoin: 'true',
            prefs_cardCovers: 'true',
            prefs_background: 'blue',
            prefs_cardAging: 'regular',
            key: process.env.TRELLO_API_KEY,
            token: req.body.token
        }
    };
      
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        else {
            console.log(response);
            res.send("Success");
        }
    });
})

router.post("/trello/board/delete", async (req, res) => {
    my_id = await getMemberId(req.body.token, "you");
    if (!my_id) {
        res.status(400).send("Can't get your id");
    }
    else {
        console.log(my_id);
        var board = await getBoardId(req.body.token, req.body.name, my_id);
        if (!board) {
            res.status(400).send("Can't get board id");
        }
        else {
            console.log(board);
            var options = {
                method: "DELETE",
                url: `https://api.trello.com/1/boards/${board}`,
                qs: {
                    key: process.env.TRELLO_API_KEY,
                    token: req.body.token
                }
            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                }
                else {
                    console.log(response);
                    res.send("Success");
                }
            });
        }
    }
}) 

router.post("/trello/user", async (req, res) => {
    var method = 'PUT';
    var option = {type: 'normal'};
    if (req.body.delete === true) {
        method = 'DELETE'
        options = null;
    }
    my_id = await getMemberId(req.body.token, "you");
    if (!my_id) {
        res.status(400).send("Can't get your id");
    }
    else {
        console.log(my_id);
        board_id = await getBoardId(req.body.token, req.body.name, my_id);
        if (!board_id) {
            res.status(400).send("Can't get board id");
        } else {
            console.log(board_id);
            member_id = await getMemberId(req.body.token, req.body.user);
            if (!member_id) {
                res.status(400).send("Can't get member id");                
            } else {
                console.log(member_id);
                var options = {
                    method: method,
                    url: `https://api.trello.com/1/boards/${board_id}/members/${member_id}`,
                    qs: {type: 'normal', key: process.env.TRELLO_API_KEY, token: req.body.token},
                    headers: {'content-type': 'application/json'}
                };
                  
                request(options, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                    }
                    else {
                        console.log(response);
                        res.send("Success");
                    }
                });                            
            }
        }
    }
})

module.exports = router;