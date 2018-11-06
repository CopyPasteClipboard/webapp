/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CardState = require("./card_state");

/***************** Move Model *******************/

/* Schema for an individual move of Klondike */
let Move = new Schema({
  startPile : {
    type: String,
    required: true,
    enum: ["pile1","pile2", "pile3", "pile4", "pile5",
            "pile6", "pile7", "stack1", "stack2",
            "stack3", "stack4", "draw", "discard"]
  },
  endPile : {
    type: String,
    required: true,
    enum: ["pile1","pile2", "pile3", "pile4", "pile5",
      "pile6", "pile7", "stack1", "stack2",
      "stack3", "stack4", "draw", "discard"]
  },
  startPosition : {
    type: Number
  },
  endPosition : {
    type: Number
  }

});

module.exports = mongoose.model("Move", Move);
