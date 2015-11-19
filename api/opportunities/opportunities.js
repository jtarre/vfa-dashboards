module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	app.get("/api/opportunities", function(req, res) {
		var conn = new jsforce.Connection({
			instanceUrl  : process.env.INSTANCE_URL,
			loginUrl     :    process.env.LOGIN_URL,
			clientSecret :process.env.CLIENT_SECRET,
			clientId     : process.env.CLIENT_ID,
			redirectUri  : process.env.REDIRECT_URI 
		});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject("Opportunity")
				.find({}, "Name", "CreatedDate", "VFA_City__c", "StageName")
				.sort({ CreatedDate: -1, Name: 1})
				.execute( function (err, opportunities) {
					res.status(200).json(opportunities);
				});
		});
	});
}