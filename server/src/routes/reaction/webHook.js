import { Router } from "express";
import storage from "../../db";
import axios from 'axios'

const routes = Router();

export async function triggerWebHook(reaction, user, actionMessage)
{
    let url = reaction.params.url + "?message=" + encodeURI(actionMessage);
    return await (axios.get(url).then(response => {
        return { success: true, params: reaction.params};
    }).catch(error => {
        return { success: false, params: reaction.params };
    }));
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined || req.body.message == undefined) {
        res.status(400).json({ success: false, error: "Missing reaction parameter" });
        return;
    }

    let reaction = {
        type: "webhook",
        ownerId: req.token.id,
        lastTrigger: 0,
        params: {
            url: req.body.url
        }
    };

    const database = storage.get();
    const reactions = database.collection("reactions");

    console.log("[Reac] WebHook > Adding a reaction for user", req.token.username);
    reactions.insertOne(reaction, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Reac] WebHook > Added reaction for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;