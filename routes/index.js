var jsforce = require('jsforce');
var _       = require('underscore');

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
    	console.log("/// user request home page ///");
    	console.log(req.user);
    	console.log("\n");
        res.render("index", {user: req.user});
    })
}