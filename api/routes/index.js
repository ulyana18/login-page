var express = require('express');
var users = require('./users');

const app = express();

users(app);

module.exports = app;
