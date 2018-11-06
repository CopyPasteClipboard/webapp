/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

const Joi = require("joi");
const { filterGameForProfile } = require("../../solitare");
const { validPassword } = require("../../../shared");

let schema = Joi.object().keys({
  username: Joi.string()
    .lowercase()
    .alphanum()
    .min(6)
    .max(32)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  primary_email : Joi.string().email().required(),
  first_name : Joi.string(),
  last_name : Joi.string(),
  city : Joi.string()
});

module.exports = app => {
  /**
   * Create a new user
   *
   * @param {req.body.username} Display name of the new user
   * @param {req.body.first_name} First name of the user - optional
   * @param {req.body.last_name} Last name of the user - optional
   * @param {req.body.city} City user lives in - optional
   * @param {req.body.primary_email} Email address of the user
   * @param {req.body.password} Password for the user
   * @return {201, {username,primary_email}} Return username and others
   */
  app.post("/v1/user", async (req, res) => {
    try{
      let data = await Joi.validate(req.body,schema, {stripUnknown : true});

      if (data.username === 'password') {
        res.status(400).send({ error: 'invalid username'});
        return;
      }

      if (!/.*[A-Z].*/.test(data.password)) {
        res.status(400).send({ error: '"password" must contain at least one uppercase character'});
        return;
      }

      if (!/.*[a-z].*/.test(data.password)) {
        res.status(400).send({ error : '"password" must contain at least one lowercase character'});
        return;
      }

      if (!/.*\d.*/.test(data.password)) {
        res.status(400).send({ error : '"password" must contain at least one numeric character'});
        return;
      }

      if (!/.*[@|!|#|$|%|^].*/.test(data.password)) {
        res.status(400).send({error : '"password" must contain at least one of: @, !, #, $, % or ^'});
        return;
      }

      let count = await app.models.User.countDocuments( { primary_email : data.primary_email });
      if (count > 0){
        res.status(400).send({error : 'email address already in use'});
        return;
      }

      let user = new app.models.User( data );
      await user.save();

      res.status(201).send(data);
    } catch (err) {
      if (err.details) {
        res.status(400).send({ error: err.details[0].message });
        return;
      }
      if (err.message) {
        res.status(400).send({ error: 'username already in use'});
        return;
      }
    }
  });

  /**
   * See if user exists
   *
   * @param {req.params.username} Username of the user to query for
   * @return {200 || 404}
   */
  app.head("/v1/user/:username", async (req, res) => {
    let schema = Joi.object().keys({
      username: Joi.string()
        .lowercase()
        .alphanum()
        .min(6)
        .max(32)
        .required()
    });
    try {
      let data = await Joi.validate({username : req.params.username},schema);

      let count = await app.models.User.countDocuments({username : data.username});

      res.sendStatus(count > 0 ? 200 : 404);
    } catch (err) {
      res.sendStatus(404);
    }
  });

  /**
   * Fetch user information
   *
   * @param {req.params.username} Username of the user to query for
   * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
   */
  app.get("/v1/user/:username", async (req, res) => {
    let schema = Joi.object().keys({
      username: Joi.string()
        .lowercase()
        .alphanum()
        .min(6)
        .max(32)
        .required()
    });
    try {
      let data = await Joi.validate({username : req.params.username},schema);

      let user = await app.models.User.findOne({username : data.username});

      if (!user) {
        res.status(404).send({ error : `unknown user: ${req.params.username}`});
      } else {
        let ret = {
          username : user.username,
          primary_email: user.primary_email,
          games : user.games,
          first_name : user.first_name,
          last_name : user.last_name,
          city : user.city
        };
        res.status(200).send(ret);
      }
    } catch (err) {
      res.status(404).send({ error : `unknown user: ${req.params.username}`});
    }
  });

  /**
   * Update a user's profile information
   *
   * @param {req.body.first_name} First name of the user - optional
   * @param {req.body.last_name} Last name of the user - optional
   * @param {req.body.city} City user lives in - optional
   * @return {204, no body content} Return status only
   */
  app.put("/v1/user", async (req, res) => {
    let schema = Joi.object().keys({
      first_name : Joi.string(),
      last_name : Joi.string(),
      city : Joi.string()
    });
    if (!req.session.user){
      res.status(401).send({ error: 'unauthorized' });
    } else {
      try {
        let data = await Joi.validate(req.body, schema, { stripUnknown:  true});
        if (Object.keys(data).length === 0){
          res.sendStatus(204);
        } else {
          let user = req.session.user;

          await app.models.User.update({ _id : user._id} , { $set : data});

          res.status(204).send({ data });
        }
      } catch (err) {
        console.log(err);
        res.status(300).send({ error : err })
      }
    }
  });
};
