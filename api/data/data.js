module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	app.get("/api/data/companies", function(req, res, next) {
		var conn = new jsforce.Connection({
			instanceUrl: process.env.INSTANCE_URL,
			loginUrl:    process.env.LOGIN_URL,
			redirectUri: process.env.REDIRECT_URI,
			clientSecret:process.env.CLIENT_SECRET,
			clientId:    process.env.CLIENT_ID
		});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject("Account")
				.find({
					"Department__c": "Company Partnerships"
				},
				"CreatedDate")
				.execute( function(err, accounts) {
					if (err) { return console.error(err); }
					console.log(accounts.length);
				});
		});
	});
}
/*
	let's make some magic happen
 */