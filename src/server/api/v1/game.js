/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

let Joi = require("joi");
const _ = require("underscore");
const {
  initialState,
  shuffleCards,
  filterGameForProfile,
  filterMoveForResults
} = require("../../solitare");

module.exports = app => {
  /**
   * Create a new game
   *
   * @param {req.body.game} Type of game to be played
   * @param {req.body.color} Color of cards
   * @param {req.body.draw} Number of cards to draw
   * @return {201 with { id: ID of new game }}
   */
  // TODO: why was this function not async?
  app.post("/v1/game", async (req, res) => {
    if (!req.session.user)
      res.status(501).send({ error: 'not authorized' });
    else {
      let schema = Joi.object().keys({
        game: Joi.string().lowercase().required(),
        color: Joi.string().lowercase().required(),
        draw: Joi.string()
      });
      try {
        let data = await Joi.validate(req.body, schema, { stripUnknown: true });

        if (data.game !== 'klondyke')
          res.status(400).send({ error : `failure creating game`});
        else {
          let game = new app.models.Game(data);
          await game.save();

          console.log('creating game',game);

          res.status(201).send({ id: game._id });
        }
      } catch (err) {
        if (err.details)
          res.status(400).send({ error: err.details[0].message });
        else {
          res.status(100).send({ error: "not implemented" });
        }
      }
    }
  });

  /**
   * Fetch game information
   *
   * @param (req.params.id} Id of game to fetch
   * @return {200} Game information
   */
  app.get("/v1/game/:id", async (req, res) => {
    try {
      let game = await app.models.Game.findOne( { _id : req.params.id });
      if (game){
        res.status(200).send( { id : game._id });
      } else {
        res.status(300).send({ error: `unknown game: ${req.params.game}` });
      }
    } catch (err) {
      res.status(404).send({ error: `unknown game: ${req.params.id}` });
    }
  });
};
