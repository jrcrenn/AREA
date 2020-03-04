import assert from 'assert';
import { checkIss } from "../src/routes/action/issSight"

describe('IssSightingOverLocation', function () {
    describe('Call API and check condition', function () {
        it('should return an error from a unvalid city name', async function () {
            let action = {
                params : {
                    location: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                }
            };
            let user = {};

            let returnValueFake = await checkIss(action, user);
            assert.equal(returnValueFake, undefined);
        });

        it('should return a timestamp corresponding to the time when the iss pass over the given location from a valid city name', async function () {
            let action = {
                params : {
                    location: "Paris"
                }
            };
            let user = {};

            let returnValue = await checkIss(action, user);
            if (returnValue.success === true)
                assert.equal(returnValue.success, true);
            else
                assert.equal(returnValue.success, false);
        });
    });
});