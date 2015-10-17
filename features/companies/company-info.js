var _         = require('underscore');
var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');

router.get("/", function(req, res, next) {

	var accountId = req.param("id");
	var account   = req.params.id;
	console.log("\nACCOUNT ID: " + accountId);
	console.log("4.0 api ref id: " + account);

	var conn = new jsforce.Connection({
		instanceUrl:   process.env.INSTANCE_URL,
		loginUrl:      process.env.LOGIN_URL,
		redirectUri:   process.env.REDIRECT_URI,
		clientSecret:  process.env.CLIENT_SECRET,
		clientId:      process.env.CLIENT_ID
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if (err) { return console.error(err); }
		// GET COMPANY DATA // 
		console.log(conn.accessToken);
		console.log(conn.instanceUrl);
	  // logged in user property
		console.log("User ID: " + userInfo.id);
		console.log("Org ID: " + userInfo.organizationId);
		conn.sobject("Account").retrieve(accountId, function(err, account) {
			if (err) { return console.error(err); }
			var accountData = {};

			_.each(account, function (value, key, list) {
				accountData["#" + key] = value;
			//	console.log("account key: " + key + " value: " + accountData[key]);
			});

			res.jsonp(accountData);	
		});
		
	});
});

module.exports = router;