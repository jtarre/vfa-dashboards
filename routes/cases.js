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
			var caseList = 
			{
				"" : ""
			};
			for ( var i = 0; i < cases.length; ++i ) {
				// GET CASE URL, DESCRIPTION, AND CREATED DATE // 
				// in this situation, all i want to do is get the subject and the id
				var id          = cases[i].Id;
				var subject     = cases[i].Subject;

				(function () {
					caseList[subject] = id;
				})();
			}
			
			res.render("cases",
				{
					caseList : caseList
				});
			
		});
		

	});
});

module.exports = router;