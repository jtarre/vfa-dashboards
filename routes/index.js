var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');
require('dotenv').load();

/* GET home page. */
// no seriously get the home page
// get it

module.exports = function(app, passport) {
    app.get('/', function(req, res, next) {
        res.render("index", { user : req.user });
    });
};



