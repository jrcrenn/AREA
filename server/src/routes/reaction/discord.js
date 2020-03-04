import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();

export async function triggerDiscord(reaction, user, actionMessage)
{
    const url = reaction.params.url;

    return await axios.post(url, {
        content: actionMessage,
    }).then(r => {
        return { success: true, params: reaction.params };
    }).catch(r => {
        return { success: false, params: reaction.params };
    });
}

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined) {
        res.status(400).json({ success: false, error: "Missing url parameter" });
        return;
    }

    let reaction = {
        type: "discord",
        ownerId: req.token.id,
        lastTrigger: 0,
        params: {
            url: req.body.url
        }
    };

    const database = storage.get();
    const reactions = database.collection("reactions");

    console.log("[Reac] Discord > Adding a reaction for user", req.token.username);
    reactions.insertOne(reaction, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Reac] Discord > Added reaction for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;