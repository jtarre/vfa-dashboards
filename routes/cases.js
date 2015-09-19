var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');

/* GET users listing. */
router.get('/', function(req, res, next) {

	// FELLOW ID //
	var fellowId = req.param('id');

	var conn = new jsforce.Connection({
	    loginUrl : process.env.LOGIN_URL,
	    clientSecret: process.env.CLIENT_SECRET, 
	    redirectUri: process.env.REDIRECT_URI,
	    clientId: process.env.CLIENT_ID,
	    instanceUrl: process.env.INSTANCE_URL
	}); 
	
	// login to salesforce. after this, can run all functions
	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if ( err ) {
			// add code here not to just return an error console, but to send a response
			// view back to the browser that says try again...or something 
			return console.error(err); 
		}

	// TODO: RETRIEVE CASE

	conn.sobject("Case")
		.find(
		{
			ContactId : fellowId
		},
		"*")
		.sort( { CreatedDate: -1 } )
		.limit(5)
		.execute( function(err, cases) {
			if ( err ) {
				// add code here not to just return an error console, but to send a response
				// view back to the browser that says try again...or something 
				return console.error(err); 
			}
			// TODO: GRAB DATA
			console.log("////////////// CASES /////////////");
			console.log(cases);
			// how do i get the case object into
			/*
			var caseList = {};
			for ( row in cases ) {
				caseList[row.subject] = cases[row.id]; // need to clean this up
				// basically pseudo code in its present state
				console.log("key: " caseList[row.subject] + " value: " + cases[row.id]); // this also is pseudo code and definitely not correct
			}
			*/
			// TODO: RENDER WEBSITE
			/*
			res.render("cases",
			{
				caseList : {"Jason" : "1234" }
			});
			*/
		});

	});
});

module.exports = router;