var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var _       = require('underscore');

router.get('/', function (req, res, next) {

	// FILTERS //
	var vfaCitiesToFilterOn = req.param("vfaCitiesToFilterOn");
	var vfaCitiesForFiltering = { Account_VFA_City__c : vfaCitiesToFilterOn }; 
	// have to check if cities for filtering object
	// will work if there are array of cities

	// SELECTED FELLOW //
	// if the user has already selected a Fellow 
	// ...
	//var selectedFellowId = req.param("selectedFellowId");
	var conn = new jsforce.Connection(
	{
		loginUrl    : process.env.LOGIN_URL,
		instanceUrl : process.env.INSTANCE_URL,
		redirectUri : process.env.REDIRECT_URI,
		clientSecret: process.env.CLIENT_SECRET,
		clientId    : process.env.CLIENT_ID
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function (err, userInfo) {
		if (err) { return console.error(err); }

		conn.sobject("Contact")
			.find(
			{
				"VFA_Association__c"  : "Fellow"
			},
			'Name, Id, Year, Account_Name_for_SurveyGizmo__c, Account_VFA_City__c')
			.sort( { Name: 1} )
			.execute( function (err, fellows) {
				console.log("Fellows retrieved from call: " + fellows.length);

				// on the left nav, we'll have number of 2013, 14, etc.
				// in the middle, we'll have list of names
				// how to deliver data

				// filter for city
				var filteredFellows = _.where(fellows, vfaCitiesForFiltering);
				//filteredFellows     = _.where(filteredFellows, vfaClassYearsForFiltering);
				// will need to test if it works when filter is empty


				conn.sobject("Contact").describe( function (err, fellowMetaData) {
					if (err) { return console.error(err); }

					// meta.fields time
					// i need year and city
					var vfaClassYears = {"" : ""};
					var vfaCities     = {"" : ""};

					var fellowFields = fellowMetaData.fields;
					_.each(fellowFields, function (fellowField, index, list) {
							
							// if api name is year
							if (fellowField == "Year__c") { // check api
								var vfaClassYearPicklist = fellowField.picklistValues;
								_.each(vfaClassYearPicklist, function (yearObject, index, list) {
									vfaClassYears[yearObject.label] = yearObject.value;
								});
							}

							// if api name is city
							if (fellowField == "Account_VFA_City__c") { // api name not right
								var vfaCitiesPicklist = fellowField.picklistValues;
								_.each(vfaCitiesPicklist, function (cityObject, index, list) {
									vfaCities[cityObject.label] = cityObject.value;
								});
							}
					});

					// before we send the response, 
					// let's get a count of each class
					var fellowCountPerYear = _.countBy(fellows, function(obj) {
						return obj.value["Year__c"];
					})

					// instead of sending json, i may need to render
					// and send the filters, fellows, and stats to the client
					res.render("fellow-dashboard",
					{
						fellows            : filteredFellows,
						//fellowCountPerYear : fellowCountPerYear,
						//vfaCities        : vfaCitiesToFilterOn,
						//fellowClassYears : vfaClassYears,
						//selectedFellowId   : selectedFellowId
					});
				});
			});

	});
});

module.exports = router;