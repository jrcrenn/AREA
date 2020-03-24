var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const rateLimit = require('express-rate-limit')
var dbClient = require('./dbconf');
var session = require('express-session')
const bodyParser = require ('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var areasRouter = require('./routes/areas');
var webhookRouter = require('./routes/webhook');
var authRouter = require('./routes/getAuth');
var servicesRouter = require('./routes/services')
const twitterWebhooks = require('twitter-webhooks');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const origin = {
  origin: '*',
}
app.use(cors(origin))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/area', areasRouter);
app.use('/webhook', webhookRouter);
app.use('/getAuth', authRouter);
app.use('/services', servicesRouter);


app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
})

app.use(limiter)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
