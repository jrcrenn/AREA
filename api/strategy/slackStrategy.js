const Strategy = require('passport-slack').Strategy;
const dotenv = require('dotenv');

const Registered = require('../models/registeredschema');

dotenv.config();

const slackStrategy = new Strategy({
    clientID: process.env.SLACK_ID,
    clientSecret: process.env.SLACK_SECRET,
    callbackURL: process.env.SLACK_CB_URL,
    passReqToCallback: true
},
function (req, accessToken, refreshToken, profile, done) {
    Registered.findOne({ token: accessToken, name: "Slack" }, function(err, account) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!err && account) {
            return done(null, account);
        }
        else {
            account = new Registered({
                userId: "undefined",
                name: "Slack",
                token: accessToken
            });
            console.log(account);
            try {
                account.save();
                return done(null, account);
            } catch (error) {
                console.log("Error while Slack DB saving");
                console.log(error);
                return done(error);
            }                
        }
    });
});

module.exports = slackStrategy;