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

	app.post("/api/contacts", function (req, res) {
		var contactData = req.Body;

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('Contact')
				.create(contactData, function(err, ret) {
					if(err) { return console.error(err); }
					console.log("created contact return data", ret);
					res.status(200).json(ret);
				});
		});
	});

	app.get("/api/companies/:id/contacts", function(req, res) {
		var companyId = req.params.id;

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if(err) { return console.error(err); }
			conn.sobject('Contact')
				.find({
					AccountId: companyId
				}, "*")
				.sort({ Name: 1 })
				.execute( function(err, contacts) {
					if(err) { return console.error(err); }
					console.log("contacts", contacts);
					res.status(200).json(contacts);
				})
		});
	});
}