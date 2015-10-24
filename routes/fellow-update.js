var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');

router.post('/', function (req, res, next) {

	var fellowData  = req.body;

	var conn = new jsforce.Connection(
	{
		instanceUrl   : process.env.INSTANCE_URL,
		loginUrl      : process.env.LOGIN_URL,
		redirectUri   : process.env.REDIRECT_URI,
		clientSecret  : process.env.CLIENT_SECRET,
		clientId      : process.env.CLIENT_ID
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function (err, userInfo) {
		if (err) { return console.error(err); }

		// update contact
		conn.sobject("Contact").update(body, function (err, ret) {
			if (err) { return console.error(err); }
			console.log("Successful update! Id: " + ret.id);
			res.send(ret);
		})
	})
})