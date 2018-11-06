/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

let Joi = require("joi");

module.exports = app => {
  /**
   * Log a user in
   *
   * @param {req.body.username} Username of user trying to log in
   * @param {req.body.password} Password of user trying to log in
   * @return { 200, {username, primary_email} }
   */
  app.post("/v1/session", async (req, res) => {
    let schema = Joi.object().keys({
      username : Joi.string().lowercase().required(),
      password : Joi.string().required()
    });
    try {
      let data = await Joi.validate(req.body,schema, { stripUnknown : true });

      let user = await app.models.User.findOne({ username : data.username });
      if (!user)
        res.status(401).send({ error : "unauthorized" });
      else {
        if (!user.validateUser(data.password))
          res.status(401).send({ error: "unauthorized" });
        else {
          // Regenerate session when signing in to prevent fixation
          req.session.regenerate(() => {
            req.session.user = user;
            // If a match, return 200:{ username, primary_email }
            res.status(200).send({
              username: user.username,
              primary_email: user.primary_email
            });
          });
        }
      }
    } catch (err) {
      if (err.details)
        res.status(400).send({ error : err.details[0].message });
      else
        res.status(501).send({ error: "not implemented" });
    }

  });

  /**
   * Log a user out
   *
   * @return { 204 | 200 } if was logged in, 200 if no user in session
   */
  app.delete("/v1/session", (req, res) => {
    if (req.session.user) {
      req.session.destroy(function(err) {
        res.sendStatus(204);
      });
    }
    else
      res.sendStatus(200);
  });
};
