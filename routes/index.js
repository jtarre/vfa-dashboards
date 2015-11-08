var jsforce = require('jsforce');
var _       = require('underscore');

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
    	console.log("/// user request home page ///");
    	_.each(req.user, function(value, key, list) {
    		console.log(key + ": " + value);
    	});
    	console.log("\n");
        res.render("index", {user: req.user});
    })
}