const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../passport');
const verify = require('./verifyToken');
const { User, Github } = require('../models/usershema');
const { registerValidation, loginValidation } = require('../validation');
//require('../passport')(passport);

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
        res.send({ user: savedUser._id });
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
    res.header('auth-token', token).send(token);
});

router.get('/github', passport.authorize('github', { failureRedirect: '/account' }));

router.get('/github/callback', passport.authorize('github', { failureRedirect: '/account' }), 
function(req, res) {
    console.log(req);
    res.send(req);    
});

module.exports = router;