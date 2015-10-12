var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');

router.get("/", function(req, res, next) {

	var accountId = req.param("id");
	console.log("\nACCOUNT ID: " + accountId);

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
		var test = { "#employees" : 25};
		res.jsonp(test);
	});
});

module.exports = router;