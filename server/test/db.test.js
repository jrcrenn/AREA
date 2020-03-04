import assert from "assert";
import storage from "../src/db";
import mongodb from "mongodb";

let tries = 0;

function check_db(storage) {
    if (storage.test_connection()) {
        console.log("Connected to DB");
        storage.regen();
        tries = 0;
        return -1;
    } else if (tries >= 10) {
        console.log("DB timeout");
        return tries;
    } else {
        console.log("Waiting for DB");
        return tries;
    }
}

storage.init();

describe('DB', function () {
    describe('Connection', function () {
        it('should connect to the database', function () {
            let result = 0;
            while (result != -1 && result < 10) {
                result = check_db(storage);
            }
            assert.equal(storage.test_connection(), true);
        });
        it('should get the database object, create a collection', function (done) {
            let result = 0;
            while (result != -1 && result < 10) {
                result = check_db(storage);
            }
            let database = storage.get();
            assert(typeof(database), mongodb.Db);
            database.createCollection("test", function (err, collection) {
                assert.equal(err, null);
                assert.equal(collection.dbName, "area");
                assert.equal(collection.collectionName, "test")
                done();
            });
        });
        it('should close the connection', function (done) {
            let result = 0;
            while (result != -1 && result < 10) {
                result = check_db(storage);
            }
            assert.equal(storage.test_connection(), true);
            storage.close_connection(true, function () {
                assert.equal(storage.test_connection(), false);
                done();
            });
        });
    });
});