module.exports = function(app) {
    var jsforce = require('jsforce');
    var _       = require('underscore');
    var fellows = require('../../api/controllers/fellowController.js');

    app.get('/api/fellows', isAuthenticated, fellows.findAll);
    //app.get('/api/fellows/fellows/:id', fellows.findById);
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