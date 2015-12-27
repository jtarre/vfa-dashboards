module.exports = function(app) {
	var jsforce  = require('jsforce');
	var _        = require('lodash');

	var conn = new jsforce.Connection({
		loginUrl: process.env.LOGIN_URL,
		instanceUrl: process.env.INSTANCE_URL,
		redirectUri: process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId: process.env.CLIENT_ID
	});

	app.get("/api/users", function(req, res) {
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if(err) { return console.error(err); }
			conn.sobject("User")
				.find("*", "Name, Email")
				.sort({Name: -1})
				.execute( function(err, users) {
					if(err) { return console.error(err); }
					console.log("salesforce users:", users);
					res.status(200).json(users);
				});
		});
	});
}