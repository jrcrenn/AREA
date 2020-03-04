import { Router } from "express";
import storage from "../../db";
import parser from "rss-parser";
import list from "../../list";

let Parser = new parser();
const routes = Router();

routes.delete('/service/:name/', (req, res) => {
    const database = storage.get();
    const users = database.collection("users");

    const keyname = "tokens." + req.params.name;

    if (list.services.find((element) => element.route === req.params.name) == undefined) {
        console.log("[Svce] Generic > User", req.token.username, "attempted to delete a token for a nonexistant service");
        res.status(400).json({ success: false, error: "Invalid service name" });
        return;
    }
    console.log("[Svce] Generic > Deleting", req.params.name, "token for user", req.token.username);
    users.findOne({ _id: storage.convert_mongo_id(req.token.id) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Svce] Generic > User", req.token.username, "not found in DB");
            res.status(500).json({ success: false, error: "DB error" });
            return;
        }
        users.updateOne({ _id: storage.convert_mongo_id(req.token.id) },
        { $unset: { [keyname]: "" } },
        {}, function (error, result) {
            if (error) {
                console.log("[Svce] Generic > DB error on", req.params.name, "token deletion for user", req.token.username, ". Error below");
                console.log(error);
                res.status(500).json({ success: false, error: "Failure in database service. Please email the technical team" });
                return;
            }
            console.log("[Svce] Generic > Deleted", req.params.name, "access token for user", req.token.username)
            res.status(200).json({ success: true });
            return;
        });
    });
});

routes.get('/service/list/', (req, res) => {
    const database = storage.get();
    const users = database.collection("users");

    console.log("[Svce] Generic > Listing services for user", req.token.username);
    users.findOne({ _id: storage.convert_mongo_id(req.token.id) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Svce] Generic > User", req.token.username, "not found in DB");
            res.status(500).json({ success: false, error: "DB error" });
            return;
        }
        let serviceList = {};
        list.services.forEach((element) => {
            if (result.tokens[element.route] == undefined)
                serviceList[element.route] = false;
            else
                serviceList[element.route] = true;
        });
        res.status(200).json({ success: true, services: serviceList });
        return;
    });
});

export default routes;