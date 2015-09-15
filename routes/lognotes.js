var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');


router.post("/", function(req, res, next) {
	// get data from client call
	// send notes to salesforce
	console.log('received post request');

	
	var subject      = req.param('subject');
	var description  = req.param('description');
	var fellowId     = req.param('fellowId');
	var vfaId        = req.param('vfaId');

	console.log('subject + description: ' + subject + "\n\n" + description);

	var conn = new jsforce.Connection({
		loginUrl : 'https://login.salesforce.com/',
	    clientSecret: '4767192206007523209', 
	    clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
	    redirectUri: 'http://localhost:3000/oauth/_callback',
	    instanceUrl: 'https://na14.salesforce.com'
	}); 
	conn.login("jason@ventureforamerica.org", "1010Boobooboo!!", function(err, userInfo) {
		if ( err ) { 
			console.error(err); 
			res.render('success',
			{
				result : "Unsuccessful salesforce connection. Don't worry. Try again!"
			})
		}
		console.log("Authenticated!");

		conn.sobject("Task").create({
			Subject      : subject,
			Description  : description,
			OwnerId      : vfaId,
			WhoId        : fellowId,
			Status       : "Completed",
			Priority     : "Normal",
			ActivityDate : jsforce.Date.toDateTimeLiteral(new Date()) 
		}, function(err, ret) {
			if ( err ) { 
				console.error(err); 
				res.render('success',
				{
					result : "Unsuccessful logging notes. Don't worry. Click button again!"
				})
			}
			console.log("Id!");
			res.render('success',
			{
				result : "Successfully logged notes! Feel free to check out your handiwork in Salesforce :)"
			})
			//res.send("Notes logged!");
		});
	
	});
})

module.exports = router;