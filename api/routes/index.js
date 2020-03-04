var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.render('index', { title: 'Express' });
});

router.get('/about.json', function(req, res, next) {
  console.log(req.ip.split(":").pop());
  res.status(200).json({
    client: {
      host: req.ip.split(":").pop()
    },
    server: {
      current_time: Math.floor(new Date() / 1000)
    }
  });
});

module.exports = router;
