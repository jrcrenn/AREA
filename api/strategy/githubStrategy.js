const Strategy = require('passport-github');
const dotenv = require('dotenv');

const Registered = require('../models/registeredschema');

dotenv.config();

const githubStrategy = new Strategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CB_URL,
    passReqToCallback: true
},
function (req, accessToken, refreshToken, profile, done) {
    Registered.findOne({ token: accessToken, name: "Github" }, function(err, account) {
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
                name: "Github",
                token: accessToken
            });
            console.log(account);
            try {
                account.save();
                return done(null, account);
            } catch (error) {
                console.log("Error while Github DB saving");
                console.log(error);
                return done(error);
            }                
        }
    });
});

module.exports = githubStrategy;