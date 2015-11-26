module.exports = function(app) {
  var jsforce   = require('jsforce');
  var _         = require('underscore');
  
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
      noteAssignmentId.id    = {key: WhoId, value: req.param.about};
    } else { // note is type "company"
      noteAssignmentId.id   = {key: WhatId, value: req.param.about}; 
    } 
    
    var note = {
      Subject:      req.param.subject,
      Description:  req.param.description,
      OwnerId:      req.param.vfaId, 
      Status:       "Completed",
      Priority:     "Normal"
      ActivityDate: new jsforce.Date.toDateTimeLiteral(new Date())
    };
    
    _.each(noteAssignment, function(value, key, list) {
      note[value.key] = value.value;
    });
    
    conn.sobject("Task").create({note}, function(err, ret) {
      if(err) { console.error(err) }
      res.send("Notes logged!");
    });
    
  });
}
