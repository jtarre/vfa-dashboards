module.exports = function(app) {
    var jsforce = require('jsforce');
    var Q       = require('q');
    var _       = require('underscore');

    var fellowSelfEvals = {};
    var alumniEval      = {};
    var companyEval     = {};

    var caseArray       = [];

    var companyPartnerRecordId = "012d0000000SwwyAAC";
    var selfEvalRecordId       = "012d0000000SxCNAA0";
    var alumniEvalRecordId     = "012d0000000T6aDAAS";

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
        
        // 012d0000000SxCN 012d0000000SyBP 012d0000000T6aD
        // 012d0000000SyBP 012d0000000SyBP

        conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo){
            if (err) { return console.error(err); }
            conn.sobject("Contact").retrieve(fellowId, function(err, fellowData) {
                if(err) { return console.error(err); }
                
                // SURVEYGIZMO //
                conn.sobject("SurveyGizmo__c")
                    .find({
                        Contact__c : fellowId
                    }, "*")
                    .sort({ CreatedDate: -1})
                    .limit(6)
                    .execute(function(err, surveys) {
                        if (err) { return console.error(err); }

                        _.each(surveys, function(value, index, list) {
                            console.log("Contact Id for survey index:", index, value.Contact__c, value.Name);
                        });

                        // console.log("contact id and survey record type at index:", i, surveys[0].Contact__c, surveys[0].RecordTypeId);
                        // console.log("contact id and survey record type at index:", i, surveys[1].Contact__c, surveys[1].RecordTypeId);
                        // console.log("contact id and survey record type at index:", i, surveys[2].Contact__c, surveys[2].RecordTypeId);
                        // console.log("contact id and survey record type at index:", i, surveys[3].Contact__c, surveys[3].RecordTypeId);
                        // console.log("contact id and survey record type at index:", i, surveys[4].Contact__c, surveys[4].RecordTypeId);
                        // console.log("contact id and survey record type at index:", i, surveys[5].Contact__c, surveys[5].RecordTypeId);
                        // really need to divide up 
                        _.each(surveys, function (value, index) {
                            console.log("survey record type id", index, value.Name, value.RecordTypeId, value.Record_Type_Id);
    
                            if(value.RecordTypeId === companyPartnerRecordId) {
                                // var name = value.Name;
                                console.log(value.Name, value);
                                companyEval[value.Name] = value;
                            } else if(value.RecordTypeId === selfEvalRecordId) {
                                // var name = value.Name;
                                console.log(value.Name, value);
                                fellowSelfEvals[value.Name] = value;
                            } else if(value.RecordTypeId === "012d0000000SyBPAA0" || value.RecordTypeId === "012d0000000SxCN") {
                                // var name = value.Name;
                                console.log(value.Name, value);
                                fellowSelfEvals[value.Name] = value;
                            } else if(value.RecordTypeId === alumniEvalRecordId) {
                                alumniEval[value.Name] = value;
                            }
                        });

                        // ACCOUNT ACTIVITY //
                        conn.sobject("Task")
                            .find({
                                WhoId : fellowId,
                                Status: "Completed"
                            }, "Subject, Description, WhoId, Status, CreatedDate, Id, OwnerId")
                            .sort({ CreatedDate: -1})
                            .limit(3)
                            .execute(function(err, activities){


                                // CASES // 
                                conn.sobject("Case")
                                    .find({
                                        ContactId: fellowId
                                    },
                                    "*")
                                    .sort({ CreatedDate: -1 })
                                    .limit(5)
                                    .execute(function(err, cases) {
                                        if(err) { return console.error(err); }
                                            console.log("self eval", fellowSelfEvals);
                                            console.log("companyEval", companyEval);
                                            res.status(200).json({
                                                profile:     fellowData,
                                                surveySelfEvals: fellowSelfEvals,
                                                companyEval: companyEval,
                                                activities:  activities,
                                                cases:       cases
                                        });        
                                    })
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