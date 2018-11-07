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

let users = [
  {
    username : 'homebrewster',
    password : 'skollerlol',
    first_name : 'bruce',
    last_name : 'brookshire',
    clipboard: []
  },
  {
    username : 'bailersp',
    password : 'coffee',
    first_name : 'bailey',
    last_name : 'pearson',
    clipboard: []
  }
];

module.exports = {
  users : users
};
