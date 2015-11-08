var jsforce = require('jsforce');

module.exports = function(app, passport) {
  app.get('/copa', isAuthenticated, function(req, res, next) {
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
          console.error(err); 
          res.send('success',
          {
              result : "Unsuccessful Salesforce connection. Don't worry. Refresh page!"
          }
      )}

      var cityCountsTotal = {
        "Baltimore"    : 0,
        "Birmingham"   : 0,
        "Cincinnati"   : 0,
        "Charlotte"    : 0,
        "Cleveland"    : 0,
        "Columbus"     : 0,
        "Denver"       : 0,
        "Detroit"      : 0,
        "Miami"        : 0,
        "Nashville"    : 0,
        "New Orleans"  : 0,
        "Pittsburgh"   : 0,
        "Philadelphia" : 0,
        "Providence"   : 0,
        "San Antonio"  : 0,
        "St. Louis"    : 0,
        "Other"        : 0,
        "Kansas City"  : 0,
        "San Francisco Bay Area" : 0
      };

      var cityCountsPotential = {
        "Baltimore"    : 0,
        "Birmingham"   : 0,
        "Cincinnati"   : 0,
        "Charlotte"    : 0,
        "Cleveland"    : 0,
        "Columbus"     : 0,
        "Denver"       : 0,
        "Detroit"      : 0,
        "Miami"        : 0,
        "Nashville"    : 0,
        "New Orleans"  : 0,
        "Pittsburgh"   : 0,
        "Philadelphia" : 0,
        "Providence"   : 0,
        "San Antonio"  : 0,
        "St. Louis"    : 0,
        "Other"        : 0,
        "Kansas City"  : 0,
        "San Francisco Bay Area" : 0
      };

      var cityCountsPartner = {
        "Baltimore"    : 0,
        "Birmingham"   : 0,
        "Cincinnati"   : 0,
        "Charlotte"    : 0,
        "Cleveland"    : 0,
        "Columbus"     : 0,
        "Denver"       : 0,
        "Detroit"      : 0,
        "Miami"        : 0,
        "Nashville"    : 0,
        "New Orleans"  : 0,
        "Pittsburgh"   : 0,
        "Philadelphia" : 0,
        "Providence"   : 0,
        "San Antonio"  : 0,
        "St. Louis"    : 0,
        "Other"        : 0
      };

      var cityCountsThisMonth = {
        "Baltimore"    : 0,
        "Birmingham"   : 0,
        "Cincinnati"   : 0,
        "Charlotte"    : 0,
        "Cleveland"    : 0,
        "Columbus"     : 0,
        "Denver"       : 0,
        "Detroit"      : 0,
        "Miami"        : 0,
        "Nashville"    : 0,
        "New Orleans"  : 0,
        "Pittsburgh"   : 0,
        "Philadelphia" : 0,
        "Providence"   : 0,
        "San Antonio"  : 0,
        "St. Louis"    : 0,
        "Other"        : 0
      };

      console.log("\n\ncopa dashboard");
      conn.sobject("Account")
          .find(
          {
            CoPa_Association__c : "Potential Company Partner"
          },
          "VFA_City__c")
          .execute( function ( err, potentials ) {
            if (err) { return console.error(err); }
            
            var city;
            //console.log('running for loop...');
            //console.log('potentials length' + potentials.length);
            // COUNT POTENTIAL TOTALS //
            for ( var i = 0; i < potentials.length; ++i ) {
              //console.log('inside for loop...')
              city = potentials[i].VFA_City__c;
              // ADD TO TOTAL LIST //
              cityCountsTotal[city]++;
              //console.log("[Total] " + city + " : " + cityCountsTotal[city]);

              // ADD TO POTENTIAL LIST //
              cityCountsPotential[city]++
              //console.log("[Potential] " + city + " : " + cityCountsPotential[city]);
            }

            // EXISTING COMPANY PARTNERS
            conn.sobject("Account")
                .find(
                {
                  CoPa_Association__c : "Company Partner"
                },
                "VFA_City__c")
                .execute( function (err, partners) {

                  var partnerCity;
                  // COUNT PARTNER TOTALS //
                  for ( var j = 0; j < partners.length; ++j ) {

                    partnerCity = partners[j].VFA_City__c;
                    // ADD TO TOTAL LIST // 
                    cityCountsTotal[partnerCity];

                    // ADD TO PARTNER LIST // 
                    cityCountsPartner[partnerCity]++;
                  }

                  var today      = new Date();
                  var thisMonth  = today.getMonth();
                  var thisYear   = today.getFullYear();
                  conn.sobject("Account")
                      .find(
                      {
                        CoPa_Association__c    : "Potential Company Partner",
                        CreatedDate            : { "$gte" : jsforce.Date.toDateTimeLiteral(new Date(thisYear, thisMonth, 1)) }
                      },
                      "VFA_City__c")
                      .execute( function ( err, newPotentials ) {
                        if (err) {return console.error(err); }
                        console.log("\n\nnewPotentials length: " + newPotentials.length);
                        var citiesThisMonth;
                        for ( var d = 0; d < newPotentials.length; ++d ) {
                          citiesThisMonth = newPotentials[d].VFA_City__c;
                          // ADD TO THIS MONTH TOTALS //
                          cityCountsThisMonth[citiesThisMonth]++;
                        }

                        conn.sobject("Account")
                            .find(
                            {
                              CoPa_Association__c   : "Company Partner",
                              CreatedDate           : { "$gte" : jsforce.Date.toDateTimeLiteral(new Date(thisYear, thisMonth, 1)) }
                            },
                            "VFA_City__c")
                            .execute( function( err, newPartners ) {
                              if (err) { return console.error(err);}
                              console.log("newPartners length: " + newPartners.length);
                              var partnersInCitiesThisMonth;
                              for ( var e = 0; e < newPartners.length; ++e ) {
                                partnersInCitiesThisMonth = newPartners[e].VFA_City__c;
                                // ADD TO THIS MONTH TOTALS //
                                cityCountsThisMonth[partnersInCitiesThisMonth]++;
                                console.log(partnersInCitiesThisMonth + " : " + cityCountsThisMonth[partnersInCitiesThisMonth]);
                              }

                              console.log("\n\nPotentials All: " + cityCountsPotential);
                              console.log("Partners All: " + cityCountsPartner);
                              console.log("Total: " + cityCountsTotal);
                              console.log("This Month: " + cityCountsThisMonth);
                              // RENDER THE COPA DASHBOARD //
                              res.render("copa", 
                                {
                                  user            : req.user,
                                  totalCount      : cityCountsTotal,
                                  partnerCount    : cityCountsPartner,
                                  potentialCount  : cityCountsPotential,
                                  thisMonth       : cityCountsThisMonth
                                });
                            });
                          });
                      }); 
                });
          });
    });

}

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        console.log("\nUser logged in\n");
        console.log(req.user.emails[0].value);
        var userEmail = req.user.emails[0].value.toString();
        if(userEmail.indexOf('ventureforamerica.org') >= 0 ) {
            return next();    
        } else {
            console.log("\nUser not a member of Venture for America Google Apps Account");
            res.redirect("/");
        }
    } else {
        console.log("\nUser Not Logged in\n")
        res.redirect("/");
    }
};