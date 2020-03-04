import assert from "assert";
import verifyToken from '../src/jwt';
import { deliverToken } from '../src/jwt';

describe('JWT', function () {
    describe('Deliver and verify', function () {
        it('should retrieve the username and id from a signed token', function () {
            var fakeuser = {
                _id: 42,
                username: "alexis"
            };

            var token = deliverToken(fakeuser);

            var decodeduser = verifyToken(token);

            assert.notEqual(decodeduser, undefined);
            assert.equal(decodeduser.id, fakeuser._id);
            assert.equal(decodeduser.username, fakeuser.username);
        });
    });
});