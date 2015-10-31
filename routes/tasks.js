var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');
var _         = require('underscore');

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
	
	conn.sobject("Task")
		.find(
		{
			WhoId : fellowId
		},
		"*")
		.sort( { CreatedDate: -1 } )
		.limit(5)
		.execute( function(err, tasks) {
			if ( err ) {
				// add code here not to just return an error console, but to send a response
				// view back to the browser that says try again...or something 
				return console.error(err); 
			}
			//console.log("/////////////// TASK TIME //////////");
			//console.log(tasks);
			
		});
		

	});
});

module.exports = router;