var jsforce = require('jsforce');
var _       = require('underscore');

/* GET home page. */
// no seriously get the home page
// get it

module.exports = function(app, passport) {
        app.get('/fellows', function(req, res, next) {
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
                "Id, Name, Years__c")
                .sort( { Name: 1 })
                .execute( function (err, fellows) {
                    var listOfFellows = [{"" : ""}];
                    //console.log(fellows);
                    
                    _.each(fellows, function (element, index, list) {
                        listOfFellows.push(
                            {
                                "name" : element.Name,
                                "id"   : element.Id
                            });
                    });
                    listOfFellows.sort();
                    console.log("//// LIST OF FELLOWS ///");
                    //console.log(listOfFellows);
                    console.log("passport user: ");
                    _.each(req.user, function(value, key,list) {
                        console.log(key + ": " + value);
                    });
                    
                    res.render('index', 
                      { 
                        user     : req.user,
                        title      : 'Fellow Dashboard', 
                        //results    : companyRecord, 
                        //jobHistory : jobHistoryRecord,
                        vfaList    : vfaList,
                        fellowList : listOfFellows
                    }); 
                });
          });

          var vfaList = 
          { 
            ""            : "",
            "Amy Nelson"  : "005d0000001QfTE",  
            "Andrew Yang"  :  "005d0000001OKLG",  
            "Barrie Grinberg"  :  "005d0000003h7Sp",  
            "Cathlin Olszewski"  :  "005d00000031mtf",  
            "Connor Schake"  :  "005d0000004czLN",  
            "Eileen Lee"  : "005d0000001OKLf",  
            "Elisabeth Deogracias"  : "005d0000001Nsrm",  
            "Eric Caballero"  : "005d00000031CfS",  
            "Fabio DeSousa"  :  "005d0000004HJPG",  
            "Hannah Steinhardt"  :  "005d0000004czLI",  
            "Isa Ballard"  :  "005d00000031mtk",  
            "Jackie Miller"  :  "005d0000001O6g0",  
            "Jason Tarre"  :  "005d0000001OzTa",  
            "Joe Guy"  :  "005d0000002h82C",  
            "Katie Bloom"  :  "005d00000048Li7",  
            "Laila Selim"  :  "005d00000033SpB",  
            "Lauren Gill"  :  "005d0000001OKMY",  
            "Lauren Kahn"  :  "005d0000003gu2P",  
            "Leandra Elberger"  : "005d0000002hE6F",  
            "Mandy Marcus"  : "005d0000004e7gk",  
            "Megan Hurlburt"  : "005d0000001OKMT",  
            "Mike Tarullo"  : "005d0000001OKLz",  
            "Mike Henrich"  : "005d0000004KHDY",  
            "Rachel Greenspan"  : "005d0000004HrpD",  
            "Seonhye Moon"  : "005d0000001OKMd",  
            "Shira Sacks"  :  "005d0000004eY8B",  
            "Splash Admin"  : "005d0000003gMhs",  
            "Taylor Davidson"  :  "005d0000004IjzW",  
            "Tom Griffin"  :  "005d00000045mKQ",  
            "Victor Bartash"  : "005d0000004KHDd",  
            "Will Geary"  : "005d00000048iYF" 
        };
    });
};


