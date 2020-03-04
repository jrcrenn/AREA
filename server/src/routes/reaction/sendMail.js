import { Router } from "express";
import storage from "../../db";
import nodemailer from "nodemailer";

let routes = Router();

export async function triggerMail(reaction, user, actionMessage)
{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "area.teamgade@gmail.com",
            pass: "teamgade",
        }
    });
    await transporter.sendMail({
        from: '"Team Gade" <area.teamgade@gmail.com>',
        to: reaction.params.to,
        subject: reaction.params.subject,
        text: actionMessage,
        html: `<p>${actionMessage}</p>`,
    });
    return { success: true, params: reaction.params };
}

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.to == undefined || req.body.subject == undefined) {
        res.status(400).json({ success: false, error: "Missing parameter" });
        return;
    }

    let reaction = {
        type: "mail",
        ownerId: req.token.id,
        lastTrigger: 0,
        params: {
            to: req.body.to,
            subject: req.body.subject,
        }
    };

    const database = storage.get();
    const reactions = database.collection("reactions");

    console.log("[Reac] Mail > Adding a reaction for user", req.token.username);
    reactions.insertOne(reaction, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Reac] Mail > Added reaction for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;