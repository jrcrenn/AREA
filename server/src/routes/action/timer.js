import { Router } from "express";
import storage from "../../db";

const routes = Router();

//TODO: Hugo, fix les triggers multiples dans la même minute
export async function checkTimer(action, user) {
    if (isNaN(action.params.minutes) || isNaN(action.params.hours))
        return undefined;
    if (parseInt(action.params.hours) < 0 || parseInt(action.params.hours) > 24 || parseInt(action.params.minutes) < 0 || parseInt(action.params.minutes) > 59 || action.params.message === "")
        return undefined;
    let date = new Date(Date.now());
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (action.lastChecked > Date.now - 60 * 1000)
        return { success: false, params: action.params};

    if (hours === parseInt(action.params.hours) && minutes === parseInt(action.params.minutes))
        return { success: true, params: action.params, message: "It's time for " + action.params.message + " !!!" };
    else
        return { success: false, params: action.params};
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.hours === undefined || req.body.minutes === undefined) {
        res.status(400).json({ success: false, error: "Missing hours or minutes parameters" });
        return;
    }

    let action = {
        type: "timer",
        ownerId: req.token.id,
        checkInterval: 60,
        lastChecked: 0,
        linkedRea: [],
        params: {
            hours: req.body.hours,
            minutes: req.body.minutes,
            message: req.body.message
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Timer > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Timer > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;