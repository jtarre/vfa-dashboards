module.exports = function(app) {
    var jsforce = require('jsforce');
    var Q       = require('q');
    var _       = require('lodash');
    

    var companyPartnerRecordId = "012d0000000SwwyAAC";
    var selfEvalRecordId       = "012d0000000SxCNAA0";
    var alumniEvalRecordId     = "012d0000000T6aDAAS";

     var conn = new jsforce.Connection({    
            loginUrl : process.env.LOGIN_URL,
            clientSecret: process.env.CLIENT_SECRET, 
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            instanceUrl: process.env.INSTANCE_URL
        }); 

    app.get("/api/fellows/:id", isAuthenticated, function(req, res) {
        console.log("request paramaters:");
        _.each(req.params, function(element, index, list) {
            console.log(element);
            console.log(index);
        });

        if(conn) {
            console.log("already opened connection")
        }

        var fellowId = req.params.id;
        // console.log("userId: " + fellowId);

        var fellowSelfEvals = {};
        var alumniEval      = {};
        var companyEval     = {};
        var caseArray       = [];       
        
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

                        // really need to divide up 
                        _.forEach(surveys, function (value, index) {
                            // console.log("survey reallycord type id", index, value.Name, value.RecordTypeId, value.Record_Type_Id);
    
                            if(value.RecordTypeId === companyPartnerRecordId) {
                                // var name = value.Name;
                                console.log("company Eval", value.Name, value.Contact__c);
                                companyEval[value.Name] = value;
                            } else if(value.RecordTypeId === selfEvalRecordId) {
                                // var name = value.Name;
                                console.log("self eval", value.Name, value.Contact__c);
                                fellowSelfEvals[value.Name] = value;
                            } else if(value.RecordTypeId === "012d0000000SyBPAA0" || value.RecordTypeId === "012d0000000SxCN") {
                                // var name = value.Name;
                                console.log("unknown eval", value.Name, value.Contact__c);
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
                                        _.forEach(companyEval, function(value, index) {
                                            console.log("c eval case", value.Name, value.Contact__c);
                                        });
                                        if(err) { return console.error(err); }
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