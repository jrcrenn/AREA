const express = require("express");
const Axios = require("axios");

const router = express.Router();

router.post("/nasa", async (req, res) => {
  await Axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`
  )
    .then(r => {
      res.send(r.data);
    })
    .catch(e => {
      res.send(e.message);
    });
});

module.exports = router;
