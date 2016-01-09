module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('lodash');
	var salesforce = 

	var conn = new jsforce.Connection({
		instanceUrl: process.env.INSTANCE_URL,
		loginUrl: process.env.LOGIN_URL,
		redirectUri: process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId: process.env.CLIENT_ID
	});

	app.post("/api/cases", function(req, res) {
		var newCase = req.body;
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('Case')
				.create(newCase, function(err, ret) {
					if (err) { return console.error(err); }
					res.status(200).json(ret);
				})
		})

	});
}