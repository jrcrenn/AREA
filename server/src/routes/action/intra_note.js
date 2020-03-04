import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();

// TODO: Hugo, grader
export async function checkIntraNote(action, user) {
    if (user.tokens.intra == undefined)
        return undefined;
    let getUserInfos = "https://intra.epitech.eu/" + user.tokens.intra + "/user/notification/message?format=json";
    let conditionsStatus = false;

    return (axios.get(getUserInfos).then(response => {
        response.data.forEach(message => {
            let d = new Date(message.date);
            let timestamp = d.getTime();
            let currentTimestamp = Date.now();
            if (message.class === "note" && timestamp >= (currentTimestamp - 10 * 60 * 1000)) {
                if (action.params.grader === undefined) {
                    conditionsStatus = true;
                    return { success: true, message: "I have been graded", params: action.params };
                } else if (action.params.grader === message.user.title) {
                    return { success: true, message: "I have been graded by " + message.user.title + ". Thanks you !", params: action.params };
                }
            }
        });
        if (conditionsStatus === false)
            return { success: false, message: "OK: Condition not passed", params: action.params };
    }).catch(error => {
        console.log("[Acti] Intra (note) > Status code: " + error);
        return { success: false, message: "KO", params: action.params };
    }));
}

routes.post('/', (req, res) => {
    let action = {
        type: "intra_note",
        ownerId: req.token.id,
        checkInterval: 3600,
        lastChecked: 0,
        linkedRea: [],
        params: {
            grader: undefined
        }
    };
    if (req.body.grader != undefined) {
        action.params.grader = req.body.grader;
    }

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Intra (note) > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Intra (note) > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;