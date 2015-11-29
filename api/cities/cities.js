module.exports = function(app) {
	app.get("/api/cities", function(req, res) {
		var MapboxClient = requre('mapbox');
		var mapbox       = MapboxClient('ACCESS TOKEN');
		var jsforce      = require('jsforce');
		var _            = require('underscore');
		
		//var cityCenter = req.param.cityAndState;
		
		var conn = new jsforce.Connection({
			instanceUrl: process.env.INSTANCE_URL,
			loginUrl:    process.env.LOGIN_URL,
			redirectUri: process.env.REDIRECT_URI,
			clientSecret:process.env.CLIENT_SECRET,
			clientId:    process.env.CLIENT_ID
		});
		
		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, funciton(err, userInfo) {
			
			conn.sobject("Account")
				.find({
					VFA_City__c: "Cleveland",
					CoPa_Association__c: "Company Partner"
				}, "Id, Name, Description, Website, MailingAddress")
				.limit(5)
				.sort( { Name: -1})
				.execute( function(err, companies) {
					var cityData = {};
					_.each(companies, function(element, index, list) {
						mapbox.geocodeForward(element.MailingAddress, function(err, res) {
							cityData[element.Name] =
							{
								lat:     res.features.center[0],
								long:    res.features.center[1],
								address: element.MailingAddress,
								url:     element.Website
								description: element.Description, 
								type:    "Company Partner",
								name:    element.Name
							}
						});
					});
					mapbox.geocodeForward("Cleveland, OH", function(err, res) {
						var cityCenter = 
						{
							lat: res.feature.center[0],
							long: res.feature.center[1],
							zoom: 8
						};
						cityData.cityCenter = cityCenter;
						res.status(200).jsonp(cityData);	
					});
					
				});
		})
		
		// new conn
		
		// login
		
		// get accounts in vfa city cleveland
		
		// _.each(accounts)
		// account.mailing address if
		//mapbox.geocodeForward(mailingAddress, fn(res) {)
		//res.status(200).json(geocodeMailingAddresses)
		// leaflet client side
	})
}
