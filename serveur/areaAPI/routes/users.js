var express = require('express');
var router = express.Router();
var dbClient = require('../dbconf');
var sendSuccess = require("../answers/sendSuccess");
var sendError = require("../answers/sendError");
var subscriber = require("../core/subscriber");
const config = require('../conf');
let jwt = require("jsonwebtoken");

async function getUserId(token) {
  try {
    var r = await dbClient.query('SELECT user_id FROM users WHERE token=$1', [token])
    if (r.rows.length != 1) {
        return (null)
    } else
        return (r.rows[0].user_id);
  } catch (err) {
      console.log(err)
      return (null)
  }
}

router.get('/area', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  dbClient.query('SELECT * FROM areas WHERE user_id = $1', [userId], (err, result) => {
      if (err) {
        sendError(res, "error request SQL")
      }
      res.status(200).json(result.rows)
  });
});

router.get('/history', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  dbClient.query('SELECT * FROM historique WHERE user_id = $1', [userId], (err, result) => {
      if (err) {
        sendError(res, "error request SQL")
      }
      res.status(200).json(result.rows)
  });
});

router.get('/user', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  dbClient.query('SELECT * FROM users WHERE user_id = $1', [userId], (err, result) => {
      if (err) {
        sendError(res, "error request SQL")
      }
      res.status(200).json(result.rows)
  });
});

router.get('/desactivateArea', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  const areaId = req.query.areaId
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  dbClient.query('SELECT * FROM areas WHERE (user_id = $1 AND id = $2)', [userId, areaId], (err, result) => {
      if (err) {
        sendError(res, "error request SQL")
        return
      }
      if (result.rows.length > 0) {
        dbClient.query('UPDATE areas SET activated = 0 WHERE id = $1;', [areaId], function(err, result) {
          if (err) {
            sendError(res, "error request SQL")
            return
          } else {
            sendSuccess(res)
          }
        })
      } else {
        sendError(res, "error area not found")
      }
  });
});

router.get('/activateArea', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  const areaId = req.query.areaId
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  dbClient.query('SELECT * FROM areas WHERE (user_id = $1 AND id = $2)', [userId, areaId], (err, result) => {
      if (err) {
        sendError(res, "error request SQL")
        return
      }
      if (result.rows.length > 0) {
        dbClient.query('UPDATE areas SET activated = 1 WHERE id = $1;', [areaId], function(err, result) {
          if (err) {
            sendError(res, "error request SQL")
            return
          } else {
            sendSuccess(res)
          }
        })
      } else {
        sendError(res, "error area not found")
      }
  });
});

router.post('/area', async function(req, res, next) {
  const userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  var area1 = req.body

  var services = await getServices(userId)
  console.log(services)

  if (services == undefined) {
    sendError(res, "Error Fatal")
    return
  }
  var reaction = await dbClient.query('SELECT * FROM reaction WHERE id = $1', [area1.reaction.reaction_id])
  var action = await dbClient.query('SELECT * FROM action WHERE id = $1', [area1.action.action_id])
  
  if (action.rows.length != 1 || reaction.rows.length != 1) {
    sendError(res, "error Action or Reaction Id")
    return
  }

  reaction = reaction.rows[0]
  action = action.rows[0]
  console.log("action : " + action.servicename)
  console.log("reaction : " + reaction.servicename)
  
  if (action.servicename != "Custom") {
    if (services.indexOf(action.servicename) <= -1) {
      sendError(res, "error Service Action not configured")
      return
    }
  }
  if (reaction.servicename != "Custom") {
    if (services.indexOf(reaction.servicename) <= -1) {
      sendError(res, "error Service Reaction not configured")
      return
    }
  }

  console.log("action + reaction OK ")

  dbClient.query('INSERT INTO areas values (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [area1.activated, userId, area1.description, area1.action_token, area1.reaction.reaction_id, area1.action.action_id, area1.action.param1, area1.reaction.param1, area1.reaction.param2], (error, result) => {
    if (error) {
        sendError(res, "error request SQL")
    } else {
        console.log(result.fields)
        subscriber(userId, area1.action.action_id, area1.action.param1, result.rows[0].id)
        sendSuccess(res)
    }
  })
});

router.delete('/area', async function(req, res, next) {
  var userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  var id = req.query.areaId
  dbClient.query('DELETE FROM areas WHERE (user_id = $1 AND id = $2)', [userId, id], (error, result) => {
    if (error) {
        sendError(res, "error request SQL")
    } else {
        console.log(result)
        sendSuccess(res)
    }
  })
});

router.get('/delete/area', async function(req, res) {
  var userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  var id = req.query.areaId
  dbClient.query('DELETE FROM areas WHERE (user_id = $1 AND id = $2)', [userId, id], (error, result) => {
    if (error) {
        sendError(res, "error request SQL")
    } else {
        console.log(result)
        sendSuccess(res)
    }
  })
});

async function getServices(userId) {
  var result = await dbClient.query('SELECT * FROM users WHERE user_id = $1', [userId])
  if (result.rows.length != 1) {
    return ["Timer"];
  } else {
      const user = result.rows[0]
      var arrayServices = ["Timer"]
      if (user.token_fb != null) {
        console.log(user.token_fb)
        arrayServices.push("Facebook")
      }
      if (user.token_tw != null) {
        console.log(user.token_fb)
        arrayServices.push("Twitter")
      }
      if (user.token_gh != null) {
        console.log(user.token_fb)
        arrayServices.push("Github")
      }
      if (user.token_gmail != null) {
        console.log(user.token_gmail)
        arrayServices.push("Gmail")
      }
      if (user.token_ol != null) {
        console.log(user.token_ol)
        arrayServices.push("Outlook")
      }
      return (arrayServices)
  }
}

router.get('/service', async function getService(req, res, next) {
  var userId = await getUserId(req.query.token)
  if (userId == null)
    res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
  else {
    arrayServices = await getServices(userId);
    res.status(200).json({services :arrayServices})
  }
})

router.post('/service', async function(req, res, next) {
  var userId = await getUserId(req.query.token)
  if (userId == null) {
      res.json({"success": 0, "message": "Request unauthorized: Invalid token."});
      return;
  }
  const service = req.query.service;
  const tokenService = req.query.tokenService;
  var toModify = "null"
  if (service == "Facebook") {
    toModify = 'UPDATE users SET token_fb = $1 WHERE user_id = $2;'
  }
  if (service == "Gmail") {
    toModify = 'UPDATE users SET token_gmail = $1 WHERE user_id = $2;'
  }
  if (service == "Outlook") {
    toModify = 'UPDATE users SET token_ol = $1 WHERE user_id = $2;'
  }
  if (service == "Twitter") {
    toModify = 'UPDATE users SET token_tw = $1 WHERE user_id = $2;'
  }
  if (service == "Facebook") {
    toModify = 'UPDATE users SET token_fb = $1 WHERE user_id = $2;'
  }
  if (service == "Github") {
    toModify = 'UPDATE users SET token_gh = $1 WHERE user_id = $2;'
  }
  if (toModify == "null") {
    sendError(res, "Service not found")
    return;
  }
  dbClient.query(toModify, [tokenService, userId], (err, result) => {
    if (err != null) {
      console.log(tokenService.length)
      console.log(err.stack)
      sendError(res, "error request SQL")
      return;
    } else {
      sendSuccess(res)
    }
  })
});

router.get('/signUp', function(req, res, next) {
  let token = jwt.sign({username: req.query.username}, config.secret, { expiresIn: '720h' });
  var checkQuery = "SELECT * FROM users WHERE username=$1"
  var insertQuery = "INSERT INTO users(username, password, token) values ($1, $2, $3)"
  var checkValues = [req.query.username]
  var insertValues = [req.query.username, req.query.password, token]
  dbClient.query(checkQuery, checkValues, function(err, result) {
    if (err) {
      console.log(err);
      sendError(res, "Internal error")
    } else {
      if (result.rows.length > 0) {
        sendError(res, "Username already taken.")
      } else {
        dbClient.query(insertQuery, insertValues, function(err, result) {
          if (err) {
            console.log(err);
            sendError(res, "Internal error")
          } else {
            res.json({"token": token})
          }
        });
      }
    }
  });
});

router.get('/signIn', function(req, res, next) {
  var checkQuery = "SELECT * FROM users WHERE username=$1"
  var checkValues = [req.query.username]
  dbClient.query(checkQuery, checkValues, function(err, result) {
    if (err) {
      console.log(err);
      sendError(res, "Internal error")
    } else {
      if (result.rows.length > 0 && result.rows[0].username == req.query.username && result.rows[0].password == req.query.password) {
        res.json({"token": result.rows[0].token});
      } else {
        sendError(res, "Wrong credentials.")
      }
    }
  });
});

module.exports = router;
