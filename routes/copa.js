var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render("copa");

	// todo: get the data

	/*
	var conn = new jsforce.Connection({
		loginUrl : 'https://login.salesforce.com/',
		clientSecret: '4767192206007523209', 
		clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
		redirectUri: 'http://localhost:3000/oauth/_callback',
		instanceUrl: 'https://na14.salesforce.com'
	}); 
	
	// login to salesforce. after this, can run all functions
	conn.login("jason@ventureforamerica.org", "5588Boobooboo!", function(err, userInfo) {
		if ( err ) { return console.error(err); }
		console.log("Authenticated!");
	});
*/
});

module.exports = router;
