import { Router } from "express";
import storage from "../../db";

const routes = Router();

routes.post('/', (req, res) => {
    if (req.query.token === undefined) {
        res.status(400).json({ success: false, error: "No token given" });
        return;
    }
    if (req.query.token.length != 45 || !req.query.token.startsWith("auth-")) {
        res.status(400).json({ success: false, error: "Invalid Épitech intranet token" });
        return;
    }
    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ _id: storage.convert_mongo_id(req.token.id) });
    cursor.count((error, result) => {
        if (error)
            throw error;

        if (result != 1) {
            console.log("[Svce] Intra > Error retrieving user data for", req.token.username);
            console.log("[Svce] Intra > Found", result, "accounts in DB for this user");
            res.status(400).json({ success: false, error: "Failure in accounts service. Please email the technical team" });
            return;
        }
        console.log("[Svce] Intra > Storing intra token for user", req.token.username)
        users.updateOne({ _id: storage.convert_mongo_id(req.token.id) },
            { $set: { "tokens.intra": req.query.token } },
            {}, function (error, result) {
                if (error) {
                    console.log("[Svce] Intra > DB error on token storage for user", req.token.username, ". Error below");
                    console.log(error);
                    res.status(500).json({ success: false, error: "Failure in database service. Please email the technical team" });
                    return;
                }
                console.log("[Svce] Intra > Stored intra token for user", req.token.username)
                res.status(200).json({ success: true });
                return;
        });
    });
});

export default routes;