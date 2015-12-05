module.exports = function(app) {
	app.post("/api/notes", function(req, res) {
		console.log("\nnote data:");
		console.log(req.noteData);
		var jsforce   = require('jsforce');
	  
		var conn = new jsforce.Connection({
			instanceUrl:  process.env.INSTANCE_URL,
	    		redirectUri:  process.env.REDIRECT_URI, 
	    		loginUrl:     process.env.LOGIN_URL,
	    		clientSecret: process.env.CLIENT_SECRET,
	    		clientId:     process.env.CLIENT_ID
	  	});
	  
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
	    
	    	// create either a WhoId for Fellows or a WhatId for a company note
		    var noteAssignmentId = {};
		    var note             = {};
		    
		    if( req.param.type === "fellow") {
			     note.WhoId   = req.param.fellowId;
			     note.WhatId  = req.param.caseId;
			} else { // note is type "company"
				note.WhatId = req.param.companyId; 
			} 
		    
		    	note = {
		      		Subject:      req.param.noteSubject,
		      		Description:  req.param.noteDescription,
		      		OwnerId:      req.param.vfaId, 
		      		Status:	     "Completed",
			      	Priority:     "Normal",
			      	ActivityDate: new jsforce.Date.toDateTimeLiteral(new Date())
		    	};
		    
		    	conn.sobject("Task").create(note, function(err, ret) {
		      		if(err) { console.error(err) }
		      		res.set('Content-Type', 'application/json'); // tell Angular that this is JSON
					res.send(JSON.stringify({success: "success!"}));
		    	});
	  	});
	});
}
