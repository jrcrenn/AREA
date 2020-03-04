const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const createError = require("http-errors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const trelloRouter = require("./test/auth/Trello/Trello");
const githubRouter = require("./test/auth/Github/Github");
const yammerRouter = require("./test/auth/Yammer/Yammer");
const twitchRouter = require("./test/auth/Twitch/Twitch");
const slackRouter = require("./test/auth/Slack/Slack");
const facebookRouter = require("./test/auth/Facebook/Facebook");
const weather = require("./test/weather/Weather");

const nasa = require("./test/weather/Nasa");

const timer = require("./test/weather/Timer");

const reactionTrello = require("./reaction/trello");
const reactionGithub = require("./reaction/github");
const reactionSlack = require("./reaction/slack");

const app = express();

app.use(cors());

dotenv.config();

// Mongoose connect

mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(err => {
    console.log("Error while DB connecting");
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/user", authRouter);
app.use("/link", trelloRouter);
app.use("/link", slackRouter);
app.use("/link", githubRouter);
app.use("/link", twitchRouter);
app.use("/link", yammerRouter);
app.use("/link", facebookRouter);
app.use("/action", reactionGithub);
app.use("/action", reactionSlack);
app.use("/action", reactionTrello);
app.use("/widget", weather);

app.use("/widget", nasa);

app.use("/widget", timer);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
