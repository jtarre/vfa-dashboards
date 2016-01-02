module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});

	app.get("/api/companies/contacts", function(req, res) {
		console.log("getting contacts");
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Contact')
				.find({
					RecordTypeId: "012d0000000StyN"
				}, "Name, Id, Account_Name_for_SurveyGizmo__c, Account_s_VFA_City__c")
				.sort({ Name: 1})
				.execute(function(err, contacts) {
					if(err) {return console.error(err);}
					// console.log(contacts);
					res.status(200).json(contacts);
			});
		});
	});

	app.get("/api/accounts/:type", isAuthenticated, function(req, res) {
		var type = req.params.type;
		var department;

		if (type === "company-partnerships") {
			department = "Company Partnerships";
		} else {
			department = "Development";
		}
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			console.log("getting accounts");
			conn.sobject('Account')
				.find(
				{
					"Department__c" : department
				},
				'Name, Id, VFA_City__c, Website, CoPa_Association__c')
				.sort({ Name : 1 }) // Sort Alphabetically A->Z
				.execute( function ( err, accounts ) {
					if(err) { return console.error(err); }
					console.log("got accounts");
					res.status(200).json(accounts);
				});
		});	
	});

	app.get("/api/companies/:id", function(req,res) {
		var id = req.params.id;
		// console.log("company id", id);
		
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Account')
				.retrieve(id, function(err, companyInfo) {
					res.status(200).json(companyInfo);
				})
		});
	});

	app.post("/api/companies", function(req, res) {
		var accountData = req.body;

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Account')
				.create(accountData, function(err, ret){
					if(err) { return console.error(err); }
					console.log("return value", ret);
					res.status(200).json(ret);
				});
		});
	});

	app.post("/api/companies/:id", function(req,res) {
		// console.log("request params", req.body);
		var id          = req.params.id;
		var accountData = req.body;

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