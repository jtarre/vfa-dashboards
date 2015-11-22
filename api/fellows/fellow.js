module.exports = function(app) {
    var jsforce = require('jsforce');
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
    
        // login to salesforce. after this, can run all functions
        conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
            if ( err ) {
                // add code here not to just return an error console, but to send a response
                // view back to the browser that says try again...or something 
                return console.error(err); 
            }
            conn.sobject("Contact").retrieve(fellowId, function(err, fellowData) {
                if (err) { 
                    return console.error(err);
                }
                res.status(200).json(fellowData);
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
            // todo: add flash message
        }
    } else {
        console.log("\nUser Not Logged in\n")
        res.send(401);
    }
}