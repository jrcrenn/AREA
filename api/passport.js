const passport = require('passport');
const githubStrategy = require('passport-github');
const { User, Github } = require('./models/usershema');

passport.use('github' ,new githubStrategy({
    clientID: '8c5b5264f9da75c1176b',
    clientSecret: '7c2929eb193d668663dc4d44c7a9c7c62f00f3eb',
    callbackURL: "http://localhost:3000/api/user/auth/github/callback",
    passReqToCallback: true
},
function (req, accessToken, refreshToken, profile, done) {
    Github.findOne({ githubId: profile.id }, function(err, account) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!err && account) {
            return done(null, account);
        }
        else {
            account = new Github({
                githubId: profile.id,
                token: accessToken,
                username: profile.username
            });
            req.account = account;
            return done(null, account);
        }
    });
}
));

module.exports = passport;