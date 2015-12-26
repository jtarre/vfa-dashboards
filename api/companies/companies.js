module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	
	app.get("/api/companies", isAuthenticated, function(req, res) {
		var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('Account')
				.find(
				{
					"Department__c" : "Company Partnerships"
				},
				'Name, Id, VFA_City__c, CoPa_Association__c, Website')
				.sort({ Name : 1 }) // Sort Alphabetically A->Z
				.execute( function ( err, accounts ) {
					res.status(200).json(accounts);
				});
		});	
	});

	app.get("/api/companies/:id", function(req,res) {
		var id = req.params.id;
		// console.log("company id", id);
		var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Account')
				.retrieve(id, function(err, companyInfo) {
					res.status(200).json(companyInfo);
				})
		});
	});

	app.post("/api/companies/", function(req,res) {
		console.log("request params", req.body);
		var id          = req.body.Id;
		var accountData = req.body;

		console.log("data on the server", accountData);

		console.log("company id", id);
		var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Account')
				.update(accountData, function(err, ret) {
					if(err) {return console.error(err);}
					console.log("return value", ret);
					res.status(200).json(ret);
				})
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