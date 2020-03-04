import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();

export async function checkIntraEndTime(action, user) {
    if (user.tokens.intra == undefined)
        return undefined;
    let getUserInfos = "https://intra.epitech.eu/" + user.tokens.intra + "/?format=json";
    let conditionStatus = false;

    return (axios.get(getUserInfos).then(response => {
        response.data.board.projets.forEach(projets => {
            if (projets.date_inscription !== "false") {
                let d = new Date(projets.date_inscription);
                let timestamp = d.getTime();
                if (timestamp > Date.now() && timestamp <= (Date.now() + 10080 * 60 * 1000)) {
                    //console.log(projets.title);
                    conditionStatus = true;
                    return { success: true, message: "OK: Condition passed", params: action.params };
                }
            }
        });
        if (conditionStatus === false)
            return { success: false, message: "OK: Condition not passed", params: action.params };
    }).catch(error => {
        console.log("[Acti] Intra (End Time) > Status code: " + error.response.status);
        //console.log(error.response.data);
        return { success: false, message: "KO", params: action.params };
    }));
}

routes.post('/', (req, res) => {
    if (req.body.daysToScan == undefined) {
        req.body.daysToScan = 7;
    }
    let action = {
        type: "intra_end",
        ownerId: req.token.id,
        checkInterval: 3600,
        lastChecked: 0,
        linkedRea: [],
        params: {
            daysToScan: req.body.daysToScan
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Intra (End Time) > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Intra (End Time) > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;