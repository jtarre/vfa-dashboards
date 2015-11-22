module.exports = function(app) {
	var jsforce = require('jsforce');
	var _       = require('underscore');
	app.get("/api/data/companies", function(req, res, next) {
		var conn = new jsforce.Connection({
			instanceUrl: process.env.INSTANCE_URL,
			loginUrl:    process.env.LOGIN_URL,
			redirectUri: process.env.REDIRECT_URI,
			clientSecret:process.env.CLIENT_SECRET,
			clientId:    process.env.CLIENT_ID
		});

		conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
			conn.sobject("Account")
				.find({
					"Department__c": "Company Partnerships"
				},
				"CreatedDate")
				.execute( function(err, accounts) {
					if (err) { return console.error(err); }
					console.log(accounts.length);
					var date = new Date();
					var month = date.getMonth();
					var year  = date.getFullYear();
					console.log("month", month);
					console.log("year", year);
					year--;
					month++;

					var startYear = year;
					var startMonth= month;

					var monthsUntilNewYear = 12 - month;

					var calendar = {};

					for (var i = 0; i < 13; ++i) { // 13 months gets previous year + current month
						if (month == 0) {
							year++;
						}
						calendar[month + " " + year] = 0;
						
						month = (month + 1) % 12;
						monthsUntilNewYear = (monthsUntilNewYear - 1) % 12;
					}
					console.log("calendar\n", calendar);
					// list made, now add relevant accounts
					var accountCreatedDate;
					var accountCreatedMonth;
					var accountCreatedYear;
					_.each(accounts, function(element, index, list) {
							console.log("new element: element date - ", element.CreatedDate);
							
							accountCreatedDate =  new Date (element.CreatedDate);
							accountCreatedMonth=  accountCreatedDate.getMonth();
							accountCreatedYear =  accountCreatedDate.getFullYear();
							
							// console.log("account month", accountCreatedDate, accountCreatedMonth, accountCreatedYear);

							var monthYearInCalendar = accountCreatedMonth + " " + accountCreatedYear;
							if(monthYearInCalendar in calendar) {
								console.log("	created date in can");
								calendar[accountCreatedMonth + " " + accountCreatedYear] =
								1 + calendar[accountCreatedMonth + " " + accountCreatedYear];
							}  else {
								console.log("	null");
							}
					});
					console.log("calendar after each loop", calendar);
				});
		});
	});
}