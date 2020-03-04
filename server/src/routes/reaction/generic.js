import { Router } from "express";
import storage from "../../db";

const routes = Router();

routes.delete('/reaction/:name/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.id == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }

    const database = storage.get();
    const users = database.collection("reactions");

    console.log("[Reac] Generic > Trying to delete a reaction for user", req.token.username);
    users.findOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Reac] Generic > Reaction not found for user", req.token.username);
            res.status(404).json({ success: false, error: "Reaction not found" });
            return;
        }
        if (result.ownerId != req.token.id) {
            console.log("[Reac] Generic > Trying to delete a reaction owned by another user from ", req.token.username);
            res.status(403).json({ success: false, error: "This reaction is not owned by the requesting user" });
            return;
        }
        console.log("[Reac] Generic > Deleting reaction for user", req.token.username);
        users.deleteOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
            if (error || result == null) {
                console.log("[Reac] Generic > Error on reaction deletion for user", req.token.username);
                res.status(500).json({ success: false, error: "Internal database error" });
                return;
            }
            console.log("[Reac] Generic > Deleted reaction for user", req.token.username);
            res.status(200).json({ success: true, id: req.body.id });
        });
    });
});

routes.get('/reaction/list/', (req, res) => {
    const database = storage.get();
    const reactions = database.collection("reactions");

    let reactionList = { success: true, reactionNb: 0, reactions: [] };

    console.log("[Reac] Generic > Listing reactions for user", req.token.username);
    let cursor = reactions.find({ ownerId: req.token.id }, {});
    cursor.forEach((doc) => {
        reactionList.reactionNb++;
        reactionList.reactions.push(doc);
    }, (error) => {
        if (error) {
            console.log("[Reac] List > Database error during listing for user", req.token.username);
            res.status(500).json({ success: false, error: "Database error" });
            return;
        }
        console.log("[Reac] List > Listed", reactionList.reactionNb, "reactions for user", req.token.username);
        res.status(200).json(reactionList);
    });
});

export default routes;