module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('lodash');

	var conn = new jsforce.Connection({
		instanceUrl: process.env.INSTANCE_URL,
		loginUrl: process.env.LOGIN_URL,
		redirectUri: process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId: process.env.CLIENT_ID
	});

	app.post("/api/cases", function(req, res) {
		var newCase = req.body;
		console.log("new case: ", newCase);	
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			if (err) { return console.error(err); }
			conn.sobject('Case')
				.create(newCase, function(err, ret) {
					if (err) { return console.error(err); }
					console.log("return response: ", ret);
					res.status(200).json(ret);	
				});
		});
	});

	app.get("/api/cases/fellows/:id", function(req, res) {
		var id = req.params.id;
		console.log("fellow case id: ", id);
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject('Case')
				.find({
					ContactId: id
				}, "*")
				.sort({ CreatedDate: -1 })
				.execute(function(err, cases) {
					if (err) { return console.error(err); }
					res.status(200).json(cases);
				})
		})
	})
	app.get("/api/cases/types", function(req, res) {
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {	
			conn.sobject('Case').describe(function(err, meta) {
				if (err) { return console.error(err); }
				// want to get types
				//console.log("case types: ", meta.fields.Type);
				//console.log("case fields: ", meta.fields.length);
				//console.log("case meta: ", meta.fields);
				var caseTypes;
				caseTypes = _.find(meta.fields, { label: 'Case Type'});
				res.status(200).json(caseTypes);
			});
		});
	});
}
