module.exports = function(app) {
	app.get("/api/companies", function(req, res) {
		var jsforce = require('jsforce');
		var _       = require('underscore');

		var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('Account')
				.find(
				{
					"Department__c" : "Company Partnerships"
				},
				'Name, Id, VFA_City__c, CoPa_Association__c, Website')
				.sort({ Name : 1 }) // Sort Alphabetically A->Z
				.execute( function ( err, accounts ) {
					res.status(200).json(accounts);
				});
		});	
	});
}
