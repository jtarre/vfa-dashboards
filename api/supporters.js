module.exports = function(app) {
	var salesforce = require('../api/helpers/salesforce');
	var jsforce    = require('jsforce');
	var _          = require('lodash');
	var Q          = require('q');
	var obj = {};
	var conn = salesforce.connection();
	obj.conn = conn; 

	app.get("/api/supporters", function(req, res) {
		salesforce.login(obj)
		.then( function() {
			obj.conn.sobject('Account')
				.find({
					Department__c: "Development"
				}, "Name, Id, VFA_City__c, Description")
				.sort( { Name: 1} )
				.execute( function(err, accounts) {
					if(err) { return console.error(err)};
					// console.log("accounts", accounts);
					res.status(200).json(accounts);
				})
			});
	});

	app.get("/api/supporters/contacts", function(req, res) {
		salesforce.login(obj)
			.then( function() {
				obj.conn.sobject('Contact')
					.find({
						RecordTypeId: "012d0000000StyM"
					}, "Name, Id, Title, VFA_City__c, Account_Name_for_SurveyGizmo__c, AccountId")
					.sort( { Name: 1} )
					.execute( function(err, contacts) {
						if(err) { return console.error(err)};
						// console.log("accounts", contacts);
						res.status(200).json(contacts)
					})
			})
	});

	app.get("/api/supporters/opportunities", function(req, res) {
		salesforce.login(obj)
			.then( function() {
				conn.sobject('Opportunity')
					.find({
							RecordTypeId: "012d0000000Swdq" // Grants
						}, "Name, Id")
						.sort( { Name: 1} )
						.execute( function(err, opportunities) {
							if(err) { return console.error(err)};
							res.status(200).json(opportunities);
						});
			});
	});

	app.get("/api/supporters/:id", function(req, res) {
		obj.id = req.params.id;
		salesforce.login(obj)
			.then(salesforce.getAccountById)
			.then(function(obj) {
				res.status(200).json(obj.account)
			});
	});

	app.get("/api/supporters/:id/contacts", function(req, res) {
		obj.id = req.params.id;
		salesforce.login(obj)
			.then(salesforce.getContactsForAccount)
			.then(function(obj) {
				res.status(200).json(obj.contacts)
			});
	});

	app.get("/api/supporters/:id/opportunities", function(req, res) {
		obj.id = req.params.id;
		salesforce.login(obj)
			.then(salesforce.getOpportunitiesForAccount)
			.then(function(obj) {
				res.status(200).json(obj.opportunities)
			});
	});

	app.get("/api/supporters/:id/activities", function(req, res) {
		obj.id = req.params.id;
		salesforce.login(obj)
			.then(salesforce.getActivitiesForAccount)
			.then(function(obj) {
				res.status(200).json(obj.activities)
			});
	});
}