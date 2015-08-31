var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com/',
    clientSecret: '4767192206007523209', 
    redirectUri: 'http://localhost:3000/oauth/_callback',
    clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
    instanceUrl: 'https://na14.salesforce.com'
  });
conn.login("jason@ventureforamerica.org", "5588Boobooboo!", function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log('accessToken: ' + conn.accessToken);
  console.log('instanceUrl: ' + conn.instanceUrl);
  console.log('refresh: ' + conn.refreshToken);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  var date = new Date();
  console.log("day of week: " + date.getDay() + " month: " + date.getMonth()+1);
  var newDate = new Date(2015, date.getMonth() - 2, date.getDate() - 5)
  console.log("new date: " + new Date() );
  console.log("new diff date: " + newDate);
  console.log("date: " + jsforce.Date.toDateLiteral(date));
});
 var salesforceRecords = conn.sobject("Account")
  .find(
    // conditions in JSON object
    { 
      CoPa_Association__c :  "Potential Company Partner" ,
      CreatedDate: { $gte : jsforce.Date.toDateTimeLiteral("2015-08-20") },

    },
    // fields in JSON object
    { Id: 1,
      Name: 1,
      CoPa_Association__c: 1,
      CreatedDate: 1 }
  )
  .sort({ CreatedDate: -1, Name : 1 })
  .limit(5)
  //.skip(10)
  .execute(function(err, records) {
    if (err) { return console.error(err); }
    console.log(records);
    console.log("fetched : " + records.length);
    res.render('index', { title: 'Express', results: records });
    //return records;
  });
  /*
  var salesforce = "";

  for (record in salesforceRecords) {
  	salesforce += record;
  	console.log(salesforce);
  }
  */

  
});

module.exports = router;
