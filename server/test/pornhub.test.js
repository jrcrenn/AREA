import assert from 'assert';
import { checkPornhub } from "../src/routes/action/pornhub";

describe('Pornhub', function () {
    describe('Check view number from a url given by user', function () {
        it('should return undefined from a unvalid viewIdx', async function () {
            let action = {
                params : {
                    url: "https://fr.pornhub.com/view_video.php?viewkey=ph55e3269544303",
                    viewIdx: NaN,
                    lastViewIdx: 200
                }
            };
            let user = {};

            let returnValueFake = await checkPornhub(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return undefined from a unvalid lastViewIdx', async function () {
            let action = {
                params : {
                    url: "https://fr.pornhub.com/view_video.php?viewkey=ph55e3269544303",
                    viewIdx: 3,
                    lastViewIdx: NaN
                }
            };
            let user = {};

            let returnValueFake = await checkPornhub(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return an error from a invalid pornhub url', async function () {
            let action = {
                params : {
                    url: "https://roll20.net/welcome",
                    viewIdx: 3,
                    lastViewIdx: 27
                }
            };
            let user = {};

            let returnValueFake = await checkPornhub(action, user);
            assert.equal(returnValueFake.success, false);
        });

        it('should return a answer from a valid actionParams but not triggered params', async function () {
            let action = {
                params : {
                    url: "https://fr.pornhub.com/view_video.php?viewkey=ph55e3269544303",
                    viewIdx: 3,
                    lastViewIdx: 10000000
                }
            };
            let user = {};

            let returnValueFake = await checkPornhub(action, user);
            assert.equal(returnValueFake.success, false);
        });

        it('should return a correct answer from a valid actionParams', async function () {
            let action = {
                params : {
                    url: "https://fr.pornhub.com/view_video.php?viewkey=ph55e3269544303",
                    viewIdx: 1000000,
                    lastViewIdx: 10000
                }
            };
            let user = {};

            let returnValueFake = await checkPornhub(action, user);
            assert.equal(returnValueFake.success, true);
        });
    });
});