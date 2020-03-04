const express = require("express");
const Axios = require("axios");

const router = express.Router();

router.post("/weather", async (req, res) => {
  await Axios.get(
    `https://api.weatherbit.io/v2.0/current?city=${req.body.city},${req.body.country}&key=${process.env.WEATHER_KEY}`
  )
    .then(r => {
      res.send(r.data);
    })
    .catch(e => {
      res.send(e.message);
    });
});

module.exports = router;
