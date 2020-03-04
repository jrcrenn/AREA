import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();

export async function checkIss(action, user) {
    let cityInLatLonRequest = "https://api.opencagedata.com/geocode/v1/json?q=" + action.params.location + "&key=" + process.env.GEOCODE_KEY;
    let foreachIdx = 0;
    let conditionsStatus = false;

    return (axios.get(cityInLatLonRequest).then(response => {
        if (response.data.status.message === "invalid API key" || response.data.status.code === "401") {
            console.log("[Acti] ISS > API Key is invalid or missing");
            return { success: false, params: action.params, message: "API key missing or invalid" };
        }
        if (response.data.total_results === 0) {
            console.log("[Acti] ISS > Location unknown");
            return undefined;
        }
        let issPassingTimeRequest = "";
        response.data.results.forEach(cityInformations => {
            if (foreachIdx === 0) {
                issPassingTimeRequest = "http://api.open-notify.org/iss-pass.json?lat=" + cityInformations.geometry.lat + "&lon=" + cityInformations.geometry.lng;
                foreachIdx++;
            }
        });
        if (issPassingTimeRequest !== "") {
            axios.get(issPassingTimeRequest).then(issResponse => {
                if (issResponse.data.message === "failure")
                    return { success: false, params: action.params};
                issResponse.data.response.forEach(riseTime => {
                    let timeNow = Date.now();
                    //console.log(timeNow + " | " + riseTime.risetime * 1000);
                    if (riseTime.risetime * 1000 > timeNow - (5 * 60 * 1000) && riseTime.risetime * 1000 < timeNow) {
                        //console.log(riseTime.risetime);
                        conditionsStatus = true;
                        return { success: true, params: action.params, message: "The International Space Station is just above " + action.params.location };
                    }
                    //if (riseTime.risetime * 1000 >= timeNow && (riseTime.risetime + (5 * 60 * 1000)) * 1000 < timeNow) {
                    //}
                })
            }).catch(error => {
                console.log("[Acti] ISS > Cannot reach ISS location API. Status code:" + error.response.data.status.code);
                //console.log(error.response.data.status.message);
                return { success: false, params: action.params, message: "Cannot reach ISS location API" };
            });
        }
        if (conditionsStatus === false)
            return { success: false, params: action.params};
    }).catch(error => {
        console.log("[Acti] ISS > Cannot reach city location API. Status code:" + error.response.data.status.code);
        //console.log(error.response.data.status.message);
        return { success: false, params: action.params, message: "Cannot reach city location API" };
    }));
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.location == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }

    let action = {
        type: "iss",
        ownerId: req.token.id,
        checkInterval: 300,
        lastChecked: 0,
        linkedRea: [],
        params: {
            location: req.body.location
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] ISS > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] ISS > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;