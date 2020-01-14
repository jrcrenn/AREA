var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
var keys = require('./keys')
var bcrypt = require('bcryptjs')
var User = require('../routes/model/user')

module.exports = function (passport) {
    passport.use('login',
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({
                    'local.email': email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false)
                    }
                    bcrypt.compare(password, user.local.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false)
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({
                'local.email': email
            }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    })
                }

            })
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: keys.facebook.clientID,
            clientSecret: keys.facebook.clientSecret,
            callbackURL: keys.facebook.callbackURL

        },
        function (token, refreshToken, profile, done) {
            console.log(profile)
            process.nextTick(function () {
                User.findOne({
                    'facebook.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err)
                    if (user) {
                        return done(null, user)
                    } else {
                        var newUser = new User()

                        newUser.facebook.id = profile.id
                        newUser.facebook.token = token
                        newUser.facebook.name = profile.displayName

                        newUser.save(function (err) {
                            if (err)
                                throw err
                            return done(null, newUser)
                        })
                    }
                })
            })
        }
    ))
    
    passport.use(new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: keys.google.callbackURL

        },
        function (token, refreshToken, profile, done) {
            console.log(profile)
            process.nextTick(function () {
                User.findOne({
                    'google.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err)
                    if (user) {
                        return done(null, user)
                    } else {
                        var newUser = new User()

                        newUser.google.id = profile.id
                        newUser.google.token = token
                        newUser.google.name = profile.displayName

                        newUser.save(function (err) {
                            if (err)
                                throw err
                            return done(null, newUser)
                        })
                    }
                })
            })
        }
    ))
}