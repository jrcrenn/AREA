import { Router } from "express";
import storage from "../../db";
import pornnhub from 'pornnhub';

const routes = Router();

export async function checkPornhub(action, user) {
    if (!Number.isInteger(action.params.viewIdx) || !Number.isInteger(action.params.lastViewIdx)) {
        return undefined;
    }
    return (pornnhub(action.params.url, 'views').then(response => {
        if (parseInt(response.data) + action.params.viewIdx >= action.params.lastViewIdx) {
            let videoViews = response.data.split(' ').join('');
            action.params.lastViewIdx = parseInt(videoViews);
            return { success: true, params: action.params, message: "The video " + action.params.url + " has reached " + response.data };
        } else {
            return { success: false, params: action.params};
        }
    }).catch(error => {
        console.log(error.data);
        return { success: false, params: action.params};
    }))
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined || req.body.viewIdx == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }

    let action = {
        type: "pornhub",
        ownerId: req.token.id,
        checkInterval: 3600,
        lastChecked: 0,
        linkedRea: [],
        params: {
            url: req.body.url,
            viewIdx: req.body.viewIdx,
            lastViewIdx: 0
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Pornhub > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Pornhub > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;