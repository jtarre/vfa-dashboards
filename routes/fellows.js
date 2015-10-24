var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');
var _         = require('underscore');

router.get("/", function (req, res, next) {

	var fellowId = req.param('id');
	console.log("id: " + fellowId);

	var conn = new jsforce.Connection({
		loginUrl      : process.env.LOGIN_URL,
		clientSecret  : process.env.CLIENT_SECRET,
		clientId      : process.env.CLIENT_ID,
		instanceUrl   : process.env.INSTANCE_URL,
		redirectUri   : process.env.REDIRECT_URI
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function (err, userInfo) {
		if (err) { return console.error(err); }

		conn.sobject("Contact").retrieve(fellowId, function (err, fellow) {
			if (err) { return console.error(err); }

			var fellowDataInJQueryForm = {};
			_.each(fellow, function (value, key, list) {
				fellowDataInJQueryForm["#" + key] = value;
			});

			res.jsonp(fellowDataInJQueryForm);
		})
	})
})

module.exports = router();