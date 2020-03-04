import storage from "../../db";
import { Router } from "express";
import findService from "../../utils/findService";
import verifyParams from "../../utils/verifyParams";

const routes = Router();

routes.get('/', (req, res) => {
    const database = storage.get();
    const users = database.collection("users");
 
    users.findOne({ _id: storage.convert_mongo_id(req.token.id) }, (err, doc) => {
        if (doc.service) {
            let services = [];
            for (const [key, value] of Object.entries(doc.service)) {
                services.push(findService(key));
            }
            res.json(services);
        }
    });
});

export default routes;