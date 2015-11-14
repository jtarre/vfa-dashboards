var jsforce = require('jsforce');
var _       = require('underscore');

exports.findAll  = function findAll(req, res, next) {
        if(req.param.userId) {
            console.log(req.param.userId);
        }

        console.log("user: " + process.env.USER);
      var conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : process.env.LOGIN_URL,
        clientSecret: process.env.CLIENT_SECRET, 
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        instanceUrl: process.env.INSTANCE_URL
      });
      conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
        if (err) { 
            return console.error(err); 
        }
        conn.sobject("Contact")
            .find(
            {
                "VFA_Association__c"  : "Fellow"
            },
            "Id, Name, Years__c") // add city and company
            .sort( { Name: 1 })
            .execute( function (err, fellows) {
                var listOfFellows = [{"" : ""}];
                //console.log(fellows);
                
                _.each(fellows, function (element, index, list) {
                    listOfFellows.push(
                        {
                            "name" : element.Name,
                            "id"   : element.Id,
                            "year" : element.Years__c
                        });
                });
                listOfFellows.sort();
                console.log("//// LIST OF FELLOWS ///");
                //console.log(listOfFellows);
                res.status(200).json(listOfFellows);
            });
      });
    };

// exports.findById  = function findById(req, res, next) {
// 	var userId = req.param.userId;

// 	res.status(200).json("userId" : userId);

// };







