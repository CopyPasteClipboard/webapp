/* Copyright G. Hemingway, @2018 */
"use strict";

let path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  envConfig = require("simple-env-config");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

/**********************************************************************************************************/

const setupServer = async () => {
  // Get the app config
  const conf = await envConfig("./config/config.json", env);
  const port = process.env.PORT ? process.env.PORT : conf.port;

  // Setup our Express pipeline
  let app = express();
  if (env !== "test") app.use(logger("dev"));
  app.engine("pug", require("pug").__express);
  app.set("views", __dirname);
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(logger("dev"));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "grahamcardrules",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/"
    }
  });
  app.use(app.store);
  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Import our routes
  require("./api")(app);

  app.users = require('./models/user').users;

  // Give them the SPA base page
  app.get("*", (req, res) => {
    const user = req.session.user;
    console.log(`Loading app for: ${user ? user.username : "nobody!"}`);
    let preloadedState = user
      ? {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          primary_email: user.primary_email,
          city: user.city,
          games: user.games
        }
      : {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    res.render("base.pug", {
      state: preloadedState
    });
  });

  // Run the server itself
  let server;
  server = app.listen(port, () => {
    console.log(`Assignment 4 ${env} listening on: ${server.address().port}`);
  });
};

/**********************************************************************************************************/

// Run the server
setupServer();
