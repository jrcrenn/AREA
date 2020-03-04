import * as express from "express";
import * as crypto from 'crypto';
import storage from "../db";
import verifyToken from '../jwt.js';
import { deliverToken } from '../jwt.js';

const router = express.Router();

router.post('/signin', (req, res) => {
    if (req.query.username === undefined || req.query.password === undefined) {
        console.log("[Auth] Signin > Attempt to login with missing arguments");
        res.status(400).json({ success: false, error: "API - Missing arguments" });
        return;
    }

    var username = req.query.username;
    var password_hash = crypto.pbkdf2Sync(req.query.password, req.query.username, 100000, 64, 'sha512');

    if (username.length < 3 || username.length > 254) {
        console.log("[Auth] Signin > Attempt to login with an invalid username");
        res.status(400).json({ success: false, error: "Invalid username" });
        return;
    }

    if (req.query.password.length != 128) {
        console.log("[Auth] Signin > Attempt to login with an invalid password (not a SHA512 hash)");
        res.status(400).json({ success: false, error: "API - Invalid password parameter (not a SHA512 hash)" });
        return;
    }

    console.log("[Auth] Signin > Trying to login user", username);

    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ username: username });
    cursor.count((error, result) => {
        if (error)
            throw error;

        if (result <= 0) {
            console.log("[Auth] Signin > Attempt to login with unregistered username", username);
            res.status(400).json({ success: false, error: "This username is not registered" });
            return;
        } else if (result > 1) {
            console.err("[Auth] Signin > Account twice in database! Username:", username);
            res.status(500).json({ success: false, error: "Failure in accounts service. Please email the technical team" });
            return;
        }
        cursor.next(function (error, result) {
            if (Buffer.compare(password_hash, result.password_hash.buffer) != 0) {
                console.log("[Auth] Signin > Bad password for user", username);
                res.status(400).json({ success: false, error: "Invalid password" });
                return;
            } else {
                var logToken = deliverToken(result);
                console.log("[Auth] Signin > Logged in as", username);
                res.status(200).json({ success: true, token: logToken });
            }
        });
    });
});

router.post('/signup', (req, res) => {
    if (req.query.username === undefined || req.query.password === undefined) {
        console.log("[Auth] Signup > Attempt to register with missing arguments");
        res.status(400).json({ success: false, error: "API - Missing arguments" });
        return;
    }

    var username = req.query.username;
    var password_hash = crypto.pbkdf2Sync(req.query.password, req.query.username, 100000, 64, 'sha512');

    if (username.length < 3 || username.length > 254) {
        console.log("[Auth] Signup > Attempt to signup an invalid username (length)");
        res.status(400).json({ success: false, error: "Username too long or too short (between 3 and 254 characters)"});
        return;
    }
    if (req.query.password.length != 128) {
        console.log("[Auth] Signup > Attempt to sign up with an invalid password (not a SHA512 hash)");
        res.status(400).json({ success: false, error: "API - Invalid password parameter (not a SHA512 hash)" });
        return;
    }

    console.log("[Auth] Signup > Trying to register user", username);

    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ username: username });
    cursor.count((error, result) => {
        if (error)
            throw error;

        if (result > 0) {
            console.log("[Auth] Signup > Username", username, "is already taken");
            res.status(409).json({ success: false, error: "This username is already in use" });
            return;
        }
        users.insertOne({ username: username, password_hash: password_hash }, (error, result) => {
            if (error)
                throw error;

            console.log("[Auth] Signup > Successfully registered user", username);
            res.status(200).json({ success: true, username: username });
        });
    });
});

router.get('/verify', (req, res) => {
    if (req.query.token === undefined) {
        console.log("[Auth] Verify > Attempt to verify something that is not a token");
        res.status(400).json({ success: false, error: "API - Invalid token format" });
        return;
    }

    var token = req.query.token;
    var decoded = undefined;

    try {
        decoded = verifyToken(token);
    } catch (err) {
        console.log("[Auth] Verify > Attempt to verify invalid token");
        res.status(400).json({ success: false, error: "API - Invalid token" });
        return;
    }

    if (decoded === false || decoded.username === undefined || decoded.id === undefined) {
        console.log("[Auth] Verify > Attempt to verify incomplete token");
        res.status(400).json({ success: false, error: "API - Incomplete token" });
        return;
    }

    console.log("[Auth] Verify > Verified a token for user", decoded.username);
    res.status(200).json({ success: true, username: decoded.username, user_id: decoded.id });
});

router.get('/dump', (req, res) => {
    dump_users();
    res.status(200).json({ success: true });
    return;
});

function dump_users() {
    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({});
    cursor.each(function (error, result) {
        if (error)
            throw error;

        console.log(result);
    });
};

router.purge('/drop', (req, res) => {
    drop_users();
    res.status(200).json({ success: true });
    return;
});

function drop_users() {
    const database = storage.get();
    const users = database.collection("users");
    users.drop({}, function (error, result) {
        if (error)
            throw error;

        console.log("[Auth] Drop > All users dropped XP");
    });
};

export default router;