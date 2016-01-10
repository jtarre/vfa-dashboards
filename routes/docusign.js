module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('lodash');

	var conn = new jsforce.Connection({
		instanceUrl: process.env.INSTANCE_URL,
		loginUrl: process.env.LOGIN_URL,
		redirectUri: process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId: process.env.CLIENT_ID
	});

	app.get("/api/docusign/fellows", function(req, res) {
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('dsfs__DocuSign_Recipient_Status__c')
				.find({
					dsfs__Date_Signed__c: {'$lte': jsforce.Date.TODAY}
				}, "*")
				.sort({dsfs__Date_Signed__c: 1})
				.execute(function(err, offers) {
					console.log(offers);
					res.status(200).json(offers);
				})
		});
	})
}