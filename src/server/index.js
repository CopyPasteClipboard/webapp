/* Copyright G. Hemingway, @2018 */
"use strict";

let path = require("path"),
  fs = require("fs"),
  express = require("express"),
  http = require("http"),
  https = require("https"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
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

  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Give them the SPA base page
  app.get("*", (req, res) => {
    res.render("base.pug");
  });

  // Run the server itself
  let server;

  // deploy HTTPS if production
  if (env === "production") {
    const options = {
      key: fs.readFileSync(conf.security.keyPath),
      cert: fs.readFileSync(conf.security.certPath)
    };
    // Listen for HTTPS requests
    server = https.createServer(options, app).listen(port, () => {
      console.log(`Secure Assignment 5 listening on: ${server.address().port}`);
    });
    // Redirect HTTP to HTTPS
    http
      .createServer((req, res) => {
        const location = `https://${req.headers.host}${req.url}`;
        console.log(`Redirect to: ${location}`);
        res.writeHead(302, { Location: location });
        res.end();
      })
      .listen(80, () => {
        console.log(`Assignment 5 listening on 80 for HTTPS redirect`);
      });
  } else {
    server = app.listen(port, () => {
      console.log(`Assignment 5 ${env} listening on: ${server.address().port}`);
    });
  }
};

/**********************************************************************************************************/

// Run the server
setupServer();
