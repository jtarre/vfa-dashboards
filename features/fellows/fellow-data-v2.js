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
			//to rendering the fellow-data-v2 jade
			// can i send a render to part of the page? 
			// would be helpful to know more about what i'm doing
			// what would i like to do? 
			// 1. click see more button 2. send request for fellow data
			// 3. render the right pane with the new partial 
			// that's where the value of a jade template would come in
			// if i could do an includes...but then what would it look like on 
			// the first load? meteor makes some things way easier. 
			// and if you call render, how do you specify you want
			// the rendering to happen in a particular template
			// and how do you pass data from one template to another? 
			// probably obvious stuff that will be way better when i get it
			// i 
			// ya, render sends html, so you append the html to a div.
			// the div can be h3 Fellow Data, and clicking "See More" 
			// appends html to that header

			res.render("fellow-data-v2", 
			{
				fellowData : fellowDataForJQuery
			});
		});
	});

});

module.exports = router;