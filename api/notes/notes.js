module.exports = function(app) {
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
    if( req.param.type == "fellow") {
      noteAssignmentId = {key: "WhoId", value: req.param.vfaId};
    } else { // note is type "company"
      noteAssignmentId   = {key: "WhatId", value: req.param.companyId}; 
    } 
    
    var note = {
      Subject:      req.param.noteSubject,
      Description:  req.param.noteDescription,
      OwnerId:      req.param.vfaId, 
      Status:       "Completed",
      Priority:     "Normal",
      ActivityDate: new jsforce.Date.toDateTimeLiteral(new Date())
    };
    
    note[noteAssignment.key] = noteAssignment.value;
    
    
    conn.sobject("Task").create(note, function(err, ret) {
      if(err) { console.error(err) }
      res.send("Notes logged!");
    });
  });
}
