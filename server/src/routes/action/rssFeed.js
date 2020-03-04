import { Router } from "express";
import storage from "../../db";
import parser from "rss-parser";

let Parser = new parser();
const routes = Router();

export async function checkRss(action, user) {
    let isNewPost = false;
    const url = action.params.url;
    const lastChecked = action.lastChecked;
    const actualDate = Date.now();
    if (url == undefined || lastChecked == undefined) {
        console.log("[Acti] RSS > Missing parameters");
        return undefined;
    }
    let feed = await Parser.parseURL(url);
    feed.items.forEach(item => {
        const postDate = new Date(item.isoDate);
        if (postDate > lastChecked) {
            isNewPost = true;
        }
    });
    if (isNewPost)
        return { success: true, params: action.params, message: "New post on feed " + url };
    else
        return { success: false, params: action.params };
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }
    if (req.body.checkInterval == undefined || req.body.checkInterval < 60)
        req.body.checkInterval = 600;

    let action = {
        type: "rss",
        ownerId: req.token.id,
        checkInterval: req.body.checkInterval,
        lastChecked: 0,
        linkedRea: [],
        params: {
            url: req.body.url
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] RSS > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] RSS > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;