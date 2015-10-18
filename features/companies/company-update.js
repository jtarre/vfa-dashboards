var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var Slack   = require('slack-node');


router.post("/", function(req, res, next) {
	// get data from client call
	// send notes to salesforce
	console.log('received post request');
	console.log(req.body);
	var accountInfo = req.body;

	var conn = new jsforce.Connection({
	    loginUrl : process.env.LOGIN_URL,
	    clientSecret: process.env.CLIENT_SECRET, 
	    redirectUri: process.env.REDIRECT_URI,
	    clientId: process.env.CLIENT_ID,
	    instanceUrl: process.env.INSTANCE_URL
	}); 

	// Single record update
	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if (err) { return console.error(err); }
		conn.sobject("Account").update(accountInfo, function(err, ret) {
  			if (err) { return console.error(err); }
  			console.log('Updated Successfully : ' + ret.id);
  			// ...
  			res.send(ret);
		});	
	});
});

module.exports = router;