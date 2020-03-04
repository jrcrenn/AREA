import assert from 'assert';
import { checkIntraNote } from "../src/routes/action/intra_note";

describe('NoteEpitechIntra', function () {
    describe('Call API and check condition', function () {
        it('should check from the user auto-login token retrieved if there is a new note from fake user', async function () {
            let fakeuser = { tokens: { intra: "authf462" } };

            let returnValueFake = await checkIntraNote({}, fakeuser);
            assert.equal(returnValueFake.success, false);
        });
        it('should check from the user auto-login token retrieved if there is a new note from valid user', async function () {
            let trueuser = { tokens: { intra: process.env.AUTO_LOGIN_TOKEN_INTRA } };
            if (trueuser.tokens.intra === undefined)
                assert.fail("Autologin token not found in env, add it in variable AUTO_LOGIN_TOKEN_INTRA");
            let returnValue = await checkIntraNote({}, trueuser);
            assert.equal(returnValue.message.startsWith("OK:"), true);
        });
    });
});