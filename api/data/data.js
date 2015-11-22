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

					_.countBy(accounts, function(account) {
						/*
							a: create empty object to hold month/years
							b: add empty object ...
							1: get account month and year
							2: create unique string out of month and year
							3: check for existence 
						 */

						 /*
						 	how to take into account counts of 0?
						 	if in September 14, you had 0 accounts
						 	I'd have to add in before to make it work
						 	so how can I first create months for as many as I need?
						 	1. create new date
						 	2. get today's month
						 	3. get today's year
						 	down the road: get string names for each month
						 	4. start by pulling last 12 months of account creation 
						 	4a. 12 months is easy.
						 	5. get today's year - 1
						 	6. create bucket of month year combos
						 	6a. for each via underscore
						 	6b. get month / year create string out of it.
						 	6c. add to bucket object. set value initially to 0. 

						 	question: how to for each on a wrapping number set? 

						 	hmmm...what's my list? what will the end result look like
							
							date = new Date();
							month = date.getMonth();
							year  = date.getYear();

							firstYear = year - 1;
							var monthsUntilNewYear = 12 - month;

							for (var i = 0; i < 12; ++i) {
								if (month == 0) {
									year++; // what about january? 
								}
								calendar[month + " " + year] = 0;
								month = (month + 1) % 12;
								monthsUntilNewYear = (monthsUntilNewYear - 1) % 12;
							}
							month = from a list
							year  = from a list
						 	calendar[month + " " + year] = 0;

						 	rats soooo let's say you've got january 2014. subtract 1. jan 2013
						 	if jan == 0 increment 1. back where we started. 
						 	and depending on where you are in the year. 
						 	i could make it more complicated. count down (or up) until the new year
						 	var monthsUntilNewYear = 11 - month. 
						 	this is not a generalizable solution. dates surprisingly difficult to work with. 



						  */

						/*
						todo: organize by months
						at least two parts two this
						part 1: take createddate and get month and year
						part 2: add account to appropriate bucket in object
						part 3: give each bucket an appropriate label
							
						 */
					})
				});
		});
	});
}
/*
	let's make some magic happen
 */