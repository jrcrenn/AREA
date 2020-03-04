import { Router } from "express";
import storage from "../../db";

const routes = Router();

export async function checkTrigger(action, user) {
    return { success: true, params: action.params, message: "Grade A = Broc + Hugo mange un welsh\nGrade B  = Broc avec Hugo\nGrade C = On a notre année\nGrade D = On a notre année mais moins ouf\nÉchec = Triste"};
};

routes.post('/', (req, res) => {
    let action = {
        type: "trigger",
        ownerId: req.token.id,
        checkInterval: 0,
        lastChecked: 0,
        linkedRea: [],
        params: {}
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Trigger > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Trigger > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;