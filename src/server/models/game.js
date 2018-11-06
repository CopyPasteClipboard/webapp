/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CardState = require("./card_state");

/***************** Game Model *******************/


/* Schema for overall game */
let Game = new Schema({
  game : String,
  color:  String,
  draw : String
});

module.exports = mongoose.model("Game", Game);
