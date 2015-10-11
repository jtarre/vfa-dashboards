var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');

router.get('/', function( req, res, next) {
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
			'Name, Id')
			.sort({ Name : 1 }) // Sort Alphabetically A->Z
			.execute( function ( err, accounts ) {
				var companies = {};
				console.log("///// ACCOUNTS ////")
				for ( var i = 0; i < accounts.length; ++i) {
					companies[accounts[i].Name] = accounts[i].Id;
					console.log("// companies[i] //");
					console.log("Key: " + accounts[i].Name);
					console.log("Value: " + companies[accounts[i].Name]);
				}
				res.render('companies', 
				{
					accounts: companies
				});
			});
	});
});

module.exports = router;