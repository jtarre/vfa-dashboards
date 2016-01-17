module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('lodash');

	var conn    = new jsforce.Connection({
		instanceUrl: process.env.INSTANCE_URL,
		loginUrl:    process.env.LOGIN_URL,
		redirectUri: process.env.REDIRECT_URI,
		clientSecret:process.env.CLIENT_SECRET,
		clientId:    process.env.CLIENT_ID
	});

	app.get("/api/accounts/:search", function(req, res) {
		var search = req.params.search;
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if(err) { 
				console.error(err);
				res.send("something went wrong"); 
			}
			conn.sobject('Account')
				.find({
					Name: {$like: search + '%'}
				}, "Name, Id")
				.sort( { Name: 1} )
				.execute(function(err, accounts) {
					if(err) {
						console.error(err);
						res.send("something went wrong")
					}
					res.status(200).json(accounts);
				});
		});
	});
}