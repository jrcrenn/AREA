var express = require('express');
var router = express.Router();
var dbClient = require('../dbconf');

router.get('/timer/subscribe', function(req, res) {
    const area_id = req.query.id;
    const day = req.query.day;
    const date = req.query.date;
    const hour = req.query.hour;
    const later = Number(req.query.later);
    var d = Math.trunc(Date.now() / 1000)
    var query = ""
    var values = []
    if (day) {
      query = "INSERT INTO timer(area_id, subtype, day) values($1, $2, $3) RETURNING id"
      values = [area_id, 1, day]
    } else if (date) {
      query = "INSERT INTO timer(area_id, subtype, date) values($1, $2, $3) RETURNING id"
      values = [area_id, 2, date]
    } else if (hour) {
      query = "INSERT INTO timer(area_id, subtype, hour) values($1, $2, $3) RETURNING id"
      values = [area_id, 3, hour]
    } else if (later) {
      query = "INSERT INTO timer(area_id, subtype, later, now) values($1, $2, $3, $4) RETURNING id"
      values = [area_id, 4, later, d]
    }
    dbClient.query(query, values, function(err, result) {
      console.log(result.rows)
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else
        res.json({"subId": result.rows[0].id})
    });
});

router.get('/timer/subscriptions', function(req, res) {
    dbClient.query("SELECT * from timer", function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({"error": err});
            return;
        }
        res.json({"data": result.rows});
    });
});

router.delete('/timer/subscription', function(req, res) {
  dbClient.query("DELETE FROM timer WHERE id=$1", [req.query.id])
  console.log("Deleted subscription", req.query.id)
  res.sendStatus(204)
});

module.exports = router;
