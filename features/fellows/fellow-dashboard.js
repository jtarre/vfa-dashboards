var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');

router.get('/', function (req, res, next) {

	// have to grab any filters on the page
	// some sort of if statement
	/*
		if (req.body contains filters) // pseudo-code
	 */

	var conn = new jsforce.Connection(
	{
		loginUrl    : process.env.LOGIN_URL,
		instanceUrl : process.env.INSTANCE_URL,
		redirectUri : process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId    : process.env.CLIENT_ID
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function (err, userInfo) {
		if (err) { return console.error(err); }

		conn.sobject("Contact")
			.find(
			{
				"VFA_Association__c"  : "Fellow"
			},
			'Name, Id, Year, Account_Name_for_SurveyGizmo__c')
			.sort( { Name: 1} )
			.execute( function (err, fellows) {
				console.log("Fellows retrieved from call: " + fellows.length);

				// on the left nav, we'll have number of 2013, 14, etc.
				// in the middle, we'll have list of names
				// how to deliver data
			});

	})
});

module.exports = router;