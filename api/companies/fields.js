module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	console.log("something");
	app.get("/api/fields/:type", function(req, res) {

		var type = req.param.type;
		var sobject;

		if(type === "companies") {
			sobject = "Account";
		} else { // fellow (for now)
			sobject = "Contact";
		}
		console.log("getting company field data");
		var conn = new jsforce.Connection({
			clientSecret: process.env.CLIENT_SECRET,
			clientId:     process.env.CLIENT_ID,
			loginUrl:     process.env.LOGIN_URL,
			instanceUrl:  process.env.INSTANCE_URL,
			redirectUri:  process.env.REDIRECT_URI
		});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject(sobject).describe(function(err, meta) {
				if(err) {return console.error(err);}
				console.log("meta fields", meta);
				res.status(200).json(meta);
			});
		})
	});
}