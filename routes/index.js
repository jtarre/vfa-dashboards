var jsforce = require('jsforce');
var _       = require('underscore');
require('dotenv').load();

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
        res.render("index", {user: req.user});
    })
}