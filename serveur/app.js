var express = require('express');
var mongoose = require('mongoose')
var session = require('express-session')
var app = express();
var passport = require('passport')
var cors = require('cors')
var bodyParser = require('body-parser')

var port = process.env.PORT || 8080;

var configDB = require('./config/database');
mongoose.connect(configDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require('./config/passport')(passport)

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use('/', require('./routes/routes'));
app.use(express.static('public'));

app.listen(port);
console.log('Server running on port: ' + port);