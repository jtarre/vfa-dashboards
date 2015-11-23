module.exports = function(app) {
    var jsforce = require('jsforce');
    var Q       = require('q');
    var _       = require('underscore');

    app.get("/api/fellows/:id", isAuthenticated, function(req, res) {
        console.log("request paramaters:");
        _.each(req.params, function(element, index, list) {
            console.log(element);
            console.log(index);
        });
        var fellowId = req.params.id;
        // console.log("userId: " + fellowId);

        var conn = new jsforce.Connection({    
            loginUrl : process.env.LOGIN_URL,
            clientSecret: process.env.CLIENT_SECRET, 
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            instanceUrl: process.env.INSTANCE_URL
        }); 
    
        // // promise test
        // conn.login(process.env.USER_EMAIL, process.env.PASSWORD)
        //     .then(function(userInfo){
        //         console.log("callback userInfo", userInfo);
        //         return fellowId;})
        //     .then(getFellowContactData(id))
        //     // .then(getFellowActivitiesData(jsonData))
        //     // .then(getFellowSurveyGizmoData(jsonData))
        //     // .then(getFellowCaseData(jsonData))
        //     .then(sendFellowJsonData(jsonData))
        //     .fail(function(err) { return console.error(err); });
        // login to salesforce. after this, can run all functions
        // var fellowData;
        // conn.login(process.env.USER_EMAIL, process.env.PASSWORD)
        //     .then(function (userInfo) {
        //         return conn.sobject("Contact").retrieve(fellowId);
        //     }, function (err) {
        //         // add code here not to just return an error console, but to send a response
        //         // view back to the browser that says try again...or something 
        //         return console.error(err);
        //     }).then(function(fellowData) {
        //         return conn.sobject("SurveyGizmo__c")
        //             .find({
        //                 Contact__c: fellowId
        //             }, "*")
        //             .execute();
        //     }).then(function(surveys){
        //         console.log("number of surveys: ", surveys.length);
        //         console.log("fellowData", fellowData);
        //         return fellowData;
        //     })
        //     .then(function (fellowData) {
        //         res.status(200).json(fellowData);
        //     }, function (err) {
        //         return console.error(err);
        //     });
        var fellowSelfEvals = {};
        var companyEval = {};
        
        var companyPartnerRecordId = "012d0000000SwwyAAC";
        var selfEvalRecordId    = "012d0000000SxCNAA0";

        conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo){
            if (err) { return console.error(err); }
            conn.sobject("Contact").retrieve(fellowId, function(err, fellowData) {
                if(err) { return console.error(err); }
                conn.sobject("SurveyGizmo__c")
                    .find({
                        Contact__c : fellowId
                    }, "*")
                    .sort({ CreatedDate: 1})
                    .limit(5)
                    .execute(function(err, surveys) {
                        if (err) { return console.error(err); }

                        // really need to divide up 
                        _.each(surveys, function (value, key, list) {
                            if(value.RecordTypeId == companyPartnerRecordId) {
                                // var name = value.Name;
                                companyEval[value.Name] = value;
                            } 

                            if(value.RecordTypeId == selfEvalRecordId) {
                                // var name = value.Name;
                                fellowSelfEvals[value.Name] = value;
                            }
                        });

                        conn.sobject("Task")
                            .find({
                                WhoId : fellowId,
                                Status: "Completed"
                            }, "Subject, Description, WhoId, Status, CreatedDate, Id, OwnerId")
                            .sort({ CreatedDate: 1})
                            .limit(3)
                            .execute(function(err, activities){
                                if(err) { return console.error(err); }
                                res.status(200).json({
                                    profile:     fellowData,
                                    surveySelfEvals: fellowSelfEvals,
                                    companyEval: companyEval,
                                    activities:  activities
                                });
                            })
                    })
            })
        })
    });
};

function getFellowContactData(userInfo) {
    console.log("here");
    return conn.sobject("Contact").retrieve(fellowId);
};

function sendFellowJsonData(jsonData) {
    console.log('there');
    return res.send(200).json(jsonData);
};

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
            // todo: add flash message
        }
    } else {
        console.log("\nUser Not Logged in\n")
        res.send(401);
    }
}