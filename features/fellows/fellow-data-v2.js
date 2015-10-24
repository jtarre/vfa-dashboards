var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');

router.get('/', function (req, res, next) {

	var fellowId = req.param.attr("id");
	var conn = new jsforce.Connection(
	{
		redirectUri      : process.env.REDIRECT_URI,
		instanceUrl      : process.env.INSTANCE_URL, 
		loginUrl         : process.env.LOGIN_URL,
		clientSecret     : process.env.CLIENT_SECRET,
		clientId         : process.env.CLIENT_ID
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function (err, userInfo) {

		conn.sobject("Contact").retrieve(fellowId, function (err, fellow) {

			var fellowDataForJQuery = {};
			_.each(fellow, function (salesforceFieldValue, salesforceFieldApiName, list) {
				fellowDataForJQuery["#" + salesforceFieldApiName] = salesforceFieldValue
			});

			// change the below from sending back json 
			//to rending the fellow-data-v2 jade
			res.jsonp( 
			{
				fellowData : fellowDataForJQuery
			});
		});
	});

});

module.exports = router;