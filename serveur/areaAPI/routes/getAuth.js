var express = require('express');
var router = express.Router();
var dbClient = require('../dbconf');
const {google} = require('googleapis');
var oauth2Client = require("../config/googleOauth2")
var sendSuccess = require("../answers/sendSuccess");
var sendError = require("../answers/sendError");
const fetch = require('node-fetch');
var twitterVar = require('../config/twitterOauth2');
var OAuth = require('oauth').OAuth
var util = require('util');
var expect = require('chai').expect;
const request = require('request')
var Twit = require('twit')
var dotenv = require('dotenv').config();

const credentials = {
  client: {
    id: process.env.APP_ID,
    secret: process.env.APP_PASSWORD,
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
};
const outlookAuth = require('simple-oauth2').create(credentials);


const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
   "https://www.googleapis.com/auth/userinfo.profile",
   "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send"
];

var oauth = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    twitterVar._twitterConsumerKey,
    twitterVar._twitterConsumerSecret,
    "1.0",
    "https://area.pinteed.com/getAuth/twitterCallback",
    "HMAC-SHA1"
  );

var githubOAuth = require('github-oauth')({
  githubClient: "0299e57bfc2bd33c4035",
  githubSecret: "1af83bbd3defba9c19b50b91e04244ba4bdc3162",
  baseURL: 'https://area.pinteed.com',
  loginURI: '/getAuth/github',
  callbackURI: '/getAuth/githubCallback',
  scope:"repo,user,notifications,admin:repo_hook"
})

router.get('/gmail', function (req, res) {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url)
});

router.get('/redirectUrlGmail', async function (req, res) {
    console.log(req.body)
    console.log(req.query.code)
    const {tokens} = await oauth2Client.getToken(req.query.code)
    console.log(tokens)
    res.json({"token" : tokens.access_token})
});

router.get('/github', function (req, res) {
    return githubOAuth.login(req, res);
});

router.get("/githubCallback", function(req, res){
    console.log("received callback github");
    return githubOAuth.callback(req, res);
});

githubOAuth.on('token', function(token, serverResponse) {
    serverResponse.json({"token" :  token.access_token})
})
githubOAuth.on('error', function(err) {
    console.error('there was a login error on github', err)
})

router.get('/twitter', function (req, res) {
    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failed!");
        }
        else {
          req.session.oauth = {
            token: oauth_token,
            token_secret: oauth_token_secret
          };
          console.log(req.session.oauth);
          res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
        }
        
    });
    
})

router.get('/twitterCallback', async function (req, res) {
  if (req.session.oauth) {
      req.session.oauth.verifier = req.query.oauth_verifier;
      var oauth_data = req.session.oauth;
   
      oauth.getOAuthAccessToken(
        oauth_data.token,
        oauth_data.token_secret,
        oauth_data.verifier,
        function(error, oauth_access_token, oauth_access_token_secret, results) {
          if (error) {
            console.log(error);
            res.send("Authentication Failure!");
          }
          else {
            req.session.oauth.access_token = oauth_access_token;
            req.session.oauth.access_token_secret = oauth_access_token_secret;
            console.log(results, req.session.oauth);

            var T = new Twit({
              consumer_key:         'MW3cKr6DLgbZwMepm7olGp3cd',
              consumer_secret:      '6AJPaPAa0Qr7XIk3o0WDaeJ5k1s8p9NyrJBq3HX4WHoIQ3SqRu',
              access_token:         "1219932938311282688-hNQutPg687W1d3WX7owD1mvJpiNo7U",
              access_token_secret:  "ikF2GYJVrpahRfx0uPSB0SaYNNCLDSBTSszjRLhVLYvFi"
            })

            // T.get('account/verify_credentials', { skip_status: true }, function (err, data, response) {
            //   console.log("err : ")
            //   console.log(err)
            //   console.log("data :")
            //   console.log(data)
            // })

            T.get('account_activity/webhooks', function(err, data, response) {
              if (err){
                console.log('GET webhooks ERROR');
                switch(err.message){
                  case 'Too many resources already created.':
                    T.get('account_activity/webhooks', {}, function(err, data, response) {
                      if (err){
                        console.log('GET webhooks ERROR');
                        console.log(err);
                        // res.sendStatus(500);
                      }
                      else{
                        if (data.valid){
                          console.log('webhook url already registered');
                          console.log(data);
                          res.sendStatus(200);                
                        }
                        else{
                          console.log(data);
                          console.log('deleting invalid webhook url...');

                          T.delete('account_activity/webhooks/' + data[0]['id'], {}, function(err, data, response) {
                            if (err){
                              console.log('DELETE webhooks ERROR');
                              console.log(err);
                              res.sendStatus(500);
                            }
                            else{
                              console.log('webhook url deleted');
                            }
                          });
                        }
                      }
                    });
                    break;
                  default:
                    console.log(err);
                  break;
                }
              }
              else{
                console.log('webhook url registered, subscribing...');

                T.post('account_activity/webhooks/' + data.id + '/all/dev/subscriptions', { webhook_id : data.id }, function(err, data, response) {
                  if (err){
                    console.log('GET webhooks ERROR');
                    console.log(err);
                    res.sendStatus(500);
                  }
                  else{
                    console.log('webhook url registered');
                    console.log(data);
                  }
                });
              }
            });

            //res.redirect("https://token/" +req.session.oauth.access_token + ";" + req.session.oauth.access_token_secret)
            res.json({"token":req.session.oauth.access_token + ";" + req.session.oauth.access_token_secret})
          }
        }
      );
    }
    else {
      res.redirect('https://area.pinteed.com/getAuth/twitter');
    }
});

router.get('/outlook', function(req, res) {
  console.log('getAuth/outlook req')
  const authURL = outlookAuth.authorizationCode.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI,
    scope: process.env.APP_SCOPES
  });
  console.log(`Generated auth url: ${authURL}`);
  // res.json({"url": authURL});
  res.redirect(authURL);
});

router.get('/outlookCallback', async function(req, res) {
  const code = req.query.code
  let result = await outlookAuth.authorizationCode.getToken({
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    scope: process.env.APP_SCOPES
  });
  const token = outlookAuth.accessToken.create(result);
  console.log(token);
  console.log('Token created: ', token.token);
  if (token)
    res.json({"token" : token.token.access_token});
  else
    res.json({"status": req.query.error, "message": req.query.error_description})
});

router.get('/facebook', async function(req, res) {
  console.log('facebook login called')
  // var result = await fetch("https://www.facebook.com/v6.0/dialog/oauth?client_id=504778580227922&redirect_uri=https://area.pinteed.com/getAuth/facebookCallback&state=AREA&response_type=code", {
  //   method: "GET"
  // })
  // var parsed = await result.json()
  // console.log(parsed)
  res.redirect("https://www.facebook.com/v6.0/dialog/oauth?client_id=504778580227922&redirect_uri=https://area.pinteed.com/getAuth/facebookCallback&state=AREA&response_type=code")
});

router.get('/facebookCallback', async function(req, res) {
  if (req.query.code) {
    var result = await fetch("https://graph.facebook.com/v6.0/oauth/access_token?client_id=504778580227922&redirect_uri=https://area.pinteed.com/getAuth/facebookCallback&client_secret=87ded54b6907ebc0ee0d457e55455c01&code=" + req.query.code, {
      method: "GET",
    })
    var parsed = await result.json();
    console.log(parsed)
    res.json({"token" : parsed.access_token});
  } else {
    console.log(req.query)
  }
})

module.exports = router;