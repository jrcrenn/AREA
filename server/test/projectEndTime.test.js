import assert from 'assert';
import { checkIntraEndTime } from "../src/routes/action/intra_end";

describe('ProjectEndTimeEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a project about to end from fake user', async function () {
            let fakeuser = {
                tokens: { intra: "auth-dac602d44f86d0927b3" }
            };

            let returnValueFake = await checkIntraEndTime({}, fakeuser);
            assert.equal(returnValueFake.success, false);
        });
        it('should check from the user auto-login token retrieved if there is a project about to end from valid user', async function () {
            let trueuser = { tokens: { intra: process.env.AUTO_LOGIN_TOKEN_INTRA } };
            if (trueuser.tokens.intra === undefined)
                assert.fail("Autologin token not found in env, add it in variable AUTO_LOGIN_TOKEN_INTRA");
            let returnValue = await checkIntraEndTime({}, trueuser);
            assert.equal(returnValue.message.startsWith("OK:"), true);
        });
    });
});