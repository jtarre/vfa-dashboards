var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');

/* GET home page. */
// no seriously get the home page
// get it

module.exports = function(app, passport) {
    app.get('/', function(req, res, next) {
        console.log("\npassword req.user");
        console.log(req.user);
        res.render("index", { user : req.user });
    });
};



