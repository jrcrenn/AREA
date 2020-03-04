const passport = require('passport');

const githubStrategy = require('./strategy/githubStrategy');
const slackStrategy = require('./strategy/slackStrategy');

passport.use('github', githubStrategy);

passport.use('slack', slackStrategy);

module.exports = passport;