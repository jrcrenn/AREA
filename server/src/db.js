//Epitech project
//Sébastien Bernard
import mongodb from "mongodb";

const DB_HOST = (process.env.DB_HOST === undefined ? "127.0.0.1" : process.env.DB_HOST);
const DB_PORT = (process.env.DB_PORT === undefined ? "27017" : process.env.DB_PORT);
const DB_NAME = (process.env.DB_NAME === undefined ? "area" : process.env.DB_NAME);
let url = 'mongodb://' + DB_HOST + ':' + DB_PORT;
if (process.env.MONGODB_URI != undefined)
    url = process.env.MONGODB_URI;

class db {
    static client = 0;
    static database = 0;
    static init () {
        this.client = new mongodb.MongoClient(url);
        console.log("[DB  ] Init > DB url: " + url);
        this.client.connect(function (err, client) {
            if (err != null) {
                console.error("[DB  ] Init > Failed to connect, most likely the DB server is not reachable, or the url is invalid");
                process.exit();
            }
        });
    }

    static regen() {
        this.database = this.client.db(DB_NAME);
    }

    static get() {
        return this.database;
    }

    static test_connection() {
        return this.client.isConnected();
    }

    static close_connection(force, callback) {
        if (this.client.isConnected())
            this.client.close(force, callback);
    }

    static convert_mongo_id(id) {
        var ObjectID = mongodb.ObjectID;
        return new ObjectID(id);
    }
}

export default db;
