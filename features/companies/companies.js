var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');

router.get('/', function( req, res, next) {
	var conn = new jsforce.Connection({
		clientSecret: process.env.CLIENT_SECRET,
		clientId:     process.env.CLIENT_ID,
		loginUrl:     process.env.LOGIN_URL,
		instanceUrl:  process.env.INSTANCE_URL
	});

	conn.login(process.env.USER_EMAIL, process.env.USER_PASSWORD, function(err, userInfo) {
		if (err) { return console.error(err); }
		conn.sobject('Account')
			.find(
			{
				X
			},
			{

			})
			//.sort({ name : -1 })
			.execute( function ( err, accounts ) {

				res.render({
					accounts: accounts
				});
			});
	});
});

module.exports = router;