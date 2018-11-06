/* Copyright G. Hemingway @2018 - All rights reserved */
"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/***************** User Model *******************/

const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptPassword = (salt, password) =>
  crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("hex");

const reservedNames = ["password"];

let User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  hash: { type: String},
  salt: { type: String},
  primary_email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  city : { type : String },
  games : [{type : Schema.Types.ObjectId, ref : 'Game'}]
});

User.virtual('password').set(function(password) {
  this.salt = makeSalt();
  this.hash = encryptPassword(this.salt,password);
});


User.methods.validateUser = function findSimilarType (password) {
  return this.hash === encryptPassword(this.salt,password);
};

module.exports = mongoose.model("User", User);
