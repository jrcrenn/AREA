// JWT distribution and validation
import fs from 'fs';
import jwt from 'jsonwebtoken';

const testPrivKey = fs.readFileSync('jwt_keys/private.pem', 'utf8');
const testPubKey = fs.readFileSync('jwt_keys/public.pem', 'utf8');

var signOptions = {
    issuer: "Team Gade",
    expiresIn: "4h",
    algorithm: "RS256"
};

const deliverToken = (user) => {
    var payload = {
        id: user._id,
        username: user.username
    };

    var token = jwt.sign(payload, testPrivKey, signOptions);

    console.log("[JWT ] Deliver > Delivering token to user", user.username);

    return token;
};

const verifyToken = (token) => {
    var verifyOptions = {
        issuer: "Team Gade",
        expiresIn: "4h",
        algorithm: "RS256"
    };

    var legit = undefined;
    try {
        legit = jwt.verify(token, testPubKey, verifyOptions);
    } catch (err) {
        console.log("[JWT ] Verify > Invalid token");
        return false;
    }
    console.log("[JWT ] Verify > Token verified, user", legit.username, "- ID: [" + legit.id + "]");
    return legit;
}

export default verifyToken;
export { deliverToken };