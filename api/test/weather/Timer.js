const express = require("express");
const Axios = require("axios");

const router = express.Router();

router.post("/time", async (req, res) => {
  await Axios.get(`http://worldtimeapi.org/api/timezone/${req.body.city}`)
    .then(r => {
      res.send(r.data);
    })
    .catch(e => {
      res.send(e.message);
    });
});

module.exports = router;
