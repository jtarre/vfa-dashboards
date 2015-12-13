module.exports = function(app) {
	app.post("/api/campaigns", function(req, res) {
		
		var jsforce = require("jsforce");
		var _       = require("underscore");

		var campaign = req.body;
		console.log("campaign body", campaign);


		var conn = new jsforce.Connection({
			instanceUrl:  process.env.INSTANCE_URL,
			redirectUri:  process.env.REDIRECT_URI, 
			loginUrl:     process.env.LOGIN_URL,
			clientSecret: process.env.CLIENT_SECRET,
			clientId:     process.env.CLIENT_ID
		});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject("Campaign").create(campaign, function(err, ret) {
				if(err) {return console.error(err); }
				if(ret) {
					res.status(200).json(ret);
				} else {
					res.send("Something went wrong");
				}
			})
		})
	});
}