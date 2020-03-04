const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../passport');
const verify = require('./verifyToken');
const User = require('../models/usershema');
const Registered = require('../models/registeredschema');
const { registerValidation, loginValidation } = require('../validation');
const axios = require('axios');
const url = require('url');

const dotenv = require('dotenv');
dotenv.config();

const ClientUrl = process.env.CLIENT_URL;

router.post('/register', async (req, res) => {
    // Validate data
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // Check existing user
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist)
        return res.status(400).send('Email already exist');
    // Crypting password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    // Create new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
        });
    // Save new user
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.send({ authToken: token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Check email
    const user = await User.findOne({email: req.body.email});
    if (!user)
        return res.status(400).send('Email not found');

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid password');

    // Create and assign jwt
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.send({ authToken: token });
});

router.post('/save', verify, async (req, res) => {
    const authToken = req.body.authToken;
    const token = req.body.token;
    const service = req.body.service;
    const verified = jwt.verify(authToken, process.env.TOKEN_SECRET);
    let doc = await Registered.findOne({ token: token, name: service });
    if (!doc) {
        return res.send({"Error": "Can't find this token or service"});
    }
    doc.userId = verified._id;
    try {
        doc.save();
        return res.send("Succes");
    } catch (error) {
        console.log("Server Error while updating user Id");
        return res.status(400).send('Error');
    }
});

router.get('/github', verify, passport.authorize('github', { failureRedirect: ClientUrl }));

router.get('/auth/github/callback', function (req, res, next) {
    passport.authorize('github', { failureRedirect: ClientUrl }, function (err, account, info) {
        if (err) {return next(err);}
        console.log(account);
        const url = ClientUrl + "save/?service=Github&token=" + account.token;
        return res.redirect(url);
    })(req, res, next);
});

router.get('/slack', verify, passport.authorize('slack', { failureRedirect: ClientUrl }));

router.get('/auth/slack/callback', function (req, res, next) {
    passport.authorize('slack', { failureRedirect: ClientUrl }, function (err, account, info) {
        if (err) {return next(err);}
        console.log(account);
        const url = ClientUrl + "save/?service=Slack&token=" + account.token;
        return res.redirect(url);
    })(req, res, next);
});

router.get('/trello', verify, (req, res) => {
    const url = "https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=Area&scope=read&response_type=token&callback_method=fragment&&return_url=" + ClientUrl + "trello/&key=" + process.env.TRELLO_ID;
    console.log(url);
    res.writeHead(301, { Location: url});
    res.end();
});

router.post('/epitech', verify, async (req, res) => {
    const auto_url = req.body.epitech;
    const tbx = auto_url.split("-");
    let epitech = "";
    if (tbx.length == 2) {
        epitech = tbx[1];
    }
    else if (tbx.length == 1) {
        epitech = tbx[0];
    }
    else {
        res.status(400).send("Error autologin Invalid");
    }
    const url = "https://intra.epitech.eu/auth-" + epitech + "/?format=json"
    await axios.get(url).catch(function (error) {
        console.log(error.data);
        res.status(400).send("Error autologin Invalid");
    })
    let token = req.header('auth-token');
    if (!token) {
        token = req.query.authtoken
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    let account = await Registered.findOne({ name: "Epitech", userId: verified._id });
    account.name = "Epitech";
    account.userId = verified._id;
    account.token = epitech;
    try {
        account.save();
        res.send("Success");
    } catch (error) {
        console.log("Error while saving epitech account");
        res.status(400).send("Error while saving epitech account");
    }
    res.send("okoko");
});

module.exports = router;