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
			//console.log(cases);
			
			//var caseList = {};
			var fellowCase = {};
			var caseList = {};
			console.log("//////////// MAKING CASES ////////////");
			console.log("cases length: " + cases.length);
			for ( var i = 0; i < cases.length; ++i ) {
				// GET CASE URL, DESCRIPTION, AND CREATED DATE // 
				//console.log("I = " + i);
				//console.log("cases length inside for loop: " + cases.length);
				var id          = cases[i].Id;
				var createdDate = cases[i].CreatedDate;
				var url         = process.env.INSTANCE_URL + id;
				var description = cases[i].Description;
				var subject     = cases[i].Subject;

				console.log("///////// ADDING CASE /////////");
				console.log(subject);
				
				fellowCase = {
						createdDate : "CreatedDate: " + createdDate,
						url         : "URL: " + url,
						description : "Description: " + description 
					};
				(function () {
					caseList[subject] = fellowCase;
				})();
			}
			/*
			console.log("\n\nCases: ");
			
			for ( row in caseList ) {
				console.log("Row");
				console.log("object id: " + row);
				for (object in caseList[row]) {
					console.log("object props: " + object + " object value: " + caseList[row][object]);
				}
			}
			*/
			// TODO: RENDER WEBSITE
			/*
			res.render("cases",
			{
				caseList : caseList
			});
			*/
		});

	});
});

module.exports = router;