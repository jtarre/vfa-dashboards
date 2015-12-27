module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('lodash');

	var conn = new jsforce.Connection({
			instanceUrl  : process.env.INSTANCE_URL,
			loginUrl     :    process.env.LOGIN_URL,
			clientSecret :process.env.CLIENT_SECRET,
			clientId     : process.env.CLIENT_ID,
			redirectUri  : process.env.REDIRECT_URI 
		});
	
	app.get("/api/opportunities", function(req, res) {
		
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject("Opportunity")
				.find({}, "Name", "CreatedDate", "VFA_City__c", "StageName")
				.sort({ CreatedDate: -1, Name: 1})
				.execute( function (err, opportunities) {
					res.status(200).json(opportunities);
				});
		});
	});

	app.post("/api/companies/:id/opportunities", function(req, res) {
		var companyId        = req.params.id;
		var opportunityData  = req.body;

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Opportunity')
				.create(opportunityData, function(err, ret) {
					if(err) { return console.error(err); }
					console.log("new opportunity data", ret);
					res.status(200).json(ret);
				})
		});
	});

	app.get("/api/companies/:id/opportunities", function(req, res) {
		var companyId = req.params.id;

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Opportunity')
				.find({
					AccountId: companyId
				}, "*")
				.execute( function(err, opportunities) {
					if(err) { return console.error(err); }
					res.status(200).json(opportunities);
				});
		});
	});

}