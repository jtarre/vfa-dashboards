module.exports = function(app) {
	app.post("/api/notes", function(req, res) {
		console.log("\nnote data:");
		console.log(req.noteData);
		var jsforce   = require('jsforce');
		var _         = require('underscore');
	  	
	  	_.each(req.params, function(element, index, list){
	  		console.log(element + " " + key);
	  	});

	  	console.log('request params', req.params);

	  	console.log('request body', req.body);

		var conn = new jsforce.Connection({
			instanceUrl:  process.env.INSTANCE_URL,
	    		redirectUri:  process.env.REDIRECT_URI, 
	    		loginUrl:     process.env.LOGIN_URL,
	    		clientSecret: process.env.CLIENT_SECRET,
	    		clientId:     process.env.CLIENT_ID
	  	});
	  
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
	    
	    	// create either a WhoId for Fellows or a WhatId for a company note
	    	note = {
	      		Subject:      req.body.noteSubject,
	      		Description:  req.body.noteDescription,
	      		OwnerId:      req.body.vfaId, 
	      		Status:	     "Completed",
		      	Priority:     "Normal",
		      	ActivityDate: new jsforce.Date.toDateTimeLiteral(new Date())
	    	};
		    
		   	if( req.body.type === "fellow") {
		   		console.log("type fellow");
				note.WhoId   = req.body.fellowId;
				note.WhatId  = req.body.caseId;
			} else { // note is type "company"
				note.WhatId = req.body.companyId; 
			} 
		    	conn.sobject("Task").create(note, function(err, ret) {
		      		if(err) { console.error(err) };
		      		console.log("return", ret);
		      		res.set('Content-Type', 'application/json'); // tell Angular that this is JSON
					res.send(JSON.stringify({success: "success!"}));
		    	});
	  	});
	});
}