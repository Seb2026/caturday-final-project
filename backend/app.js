require("dotenv").config();

const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const express = require("express");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const passport = require("passport");

// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/Caturday", {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((x) => console.log(`Connected to ${x.connections[0].name}`))
//   .catch(() => console.error("Error connecting to Mongo"));

// require database configuration
require("./configs/db.config");
app.use(cookieParser());
require("./configs/session.config")(app);

//global variable for userInSession
const bindUserToLocals = require("./configs/user-locals.config");
app.use(bindUserToLocals);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.clientURL], //Add client urls to allow CORS
  })
);

//This is for req.body
app.use(express.json());
app.use(cookieParser());

//Static files for our backend
app.use(express.static(path.join(__dirname, "../frontend/build")));

//session settings
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true,
  })
);

require("./configs/passport");

//passport initalize
app.use(passport.initialize());
app.use(passport.session());

//Our connection to the frontend >>> All our routes for now
app.use(`/api`, require("./routes/routes"));
app.use("/api", require("./routes/auth-routes"));

//Sends our one single page on all requests
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
