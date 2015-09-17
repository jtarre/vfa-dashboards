var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');

/* GET users listing. */
router.get('/', function(req, res, next) {

	// FELLOW ID //
	var fellowId = req.param('sfId');

	var conn = new jsforce.Connection({
			loginUrl : 'https://login.salesforce.com/',
		clientSecret: '4767192206007523209', 
		clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
		redirectUri: 'http://localhost:3000/oauth/_callback',
		instanceUrl: 'https://na14.salesforce.com'
	}); 
	
	// login to salesforce. after this, can run all functions
	conn.login("jason@ventureforamerica.org", "1010Boobooboo!!", function(err, userInfo) {
		if ( err ) {
			// add code here not to just return an error console, but to send a response
			// view back to the browser that says try again...or something 
			return console.error(err); 
		}

	// TODO: RETRIEVE CASE

	conn.sobject("Case")
		.find(
		{
			ContactId   : "sfId"
		},
		"*")
		.sort( { CreatedDate: -1 } )
		.limit(5)
		.execute( function(err, cases) {
			// TODO: GRAB DATA
			console.log(cases);
			// how do i get the case object into
			var caseList = {};
			for ( row in cases ) {
				caseList[row.subject] = cases[row.id]; // need to clean this up
				// basically pseudo code in its present state
				console.log("key: " caseList[row.subject] + " value: " + cases[row.id]); // this also is pseudo code and definitely not correct
			}

			// TODO: RENDER WEBSITE
			res.render("cases",
			{
				caseList : caseList
			});
		});

	});