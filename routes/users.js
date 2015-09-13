var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("get!");
	var fellowId = req.param('id');
	console.log("id: " + fellowId);
	// todo: get the data

	var conn = new jsforce.Connection({
		loginUrl : 'https://login.salesforce.com/',
		clientSecret: '4767192206007523209', 
		clientId: '3MVG9rFJvQRVOvk6KGm7WX.DOBEBOr701sDMIfbMTc24Y9Dzy2lVHwadn.FsVxVXXWhL5s7Jje0tS063s_gQV',
		redirectUri: 'http://localhost:3000/oauth/_callback',
		instanceUrl: 'https://na14.salesforce.com'
	}); 
	
	// login to salesforce. after this, can run all functions
	conn.login("jason@ventureforamerica.org", "5588Boobooboo!", function(err, userInfo) {
		if ( err ) { return console.error(err); }
		console.log("Authenticated!");
	});

	// get contact info
	conn.sobject("Contact").retrieve(fellowId, function(err, contact) {
		if (err) { return console.error(err); }
		
		console.log("Fellow Contact Data\n\n");
		for (data in contact) {
			console.log("key: " + data + " value: " + contact[data]);
		};

		// CONTACT INFO // 
		var email           = contact.Email;
		var phone           = contact.Phone;
		var description     = contact.Description;

		var birthdate       = contact.Birthdate;
		// COMPANY INFORMATION //
		var company         = contact.Account_Name_for_SurveyGizmo__c;
		var companyWebsite  = contact.Account_Website__c;
		var companyCity     = contact.Account_s_VFA_City__c;

		var jobTitle        = contact.Title;

		// SUPERVISOR INFO //
		var supervisorFirst = contact.Supervisor_First_Name__c;
		var supervisorLast  = contact.Supervisor_Last_Name__c; 
		var supervisorEmail = contact.Supervisor_Email__c;
		
		console.log("Company Name: " + company);
		console.log("email: " + email);
		
		
		var contactInfo = 
		{
			email        : "Email: " + email,
			phone        : "Phone: " + phone,
			birthday	 : "Birthday: " + birthdate,
			description  : "Bio: " + description

		};

		var companyInfo = 
		{
			company      : "Company: " + company,
			website      : "Website: " + companyWebsite,
			city         : "City: "    + companyCity,
			title        : "Job Title: " + jobTitle
		};

		var supervisorInfo = 
		{
			name         : "Supervisor:  " + supervisorFirst + " " + supervisorLast,
			email        : "Email: " + supervisorEmail
		};

		conn.sobject("SurveyGizmo__c")
			.find(
			{
				Contact__c : "003d000000wj9QY"
			},
			"*"
			)
			.sort( { CreatedDate : -1 } )
			.limit(5)
			.execute( function(err, surveys) {
				if (err) { return console.error(err); }
				
				for (var i = 0; i < surveys.length; ++i) {
					// COMPANY PARTNER SURVEY // 
						// QUANT // 
						var overall         = surveys[i].CPS_Overall__c;
						var problemSolving  = surveys[i].CPS_Problem_Solving__c;
						var professionalism = surveys[i].CPS_Professionalism__c;
						var hardSkills      = surveys[i].CPS_Hard_Skills__c;
						var communication   = surveys[i].CPS_Communication__c;
						var teamFit         = surveys[i].CPS_Team_Fit__c;

						// LONG FORM // 
						var improvement     = surveys[i].CPS_Improvement__c;
						var strength        = surveys[i].CPS_Strengths__c;

					// SELF-EVALUATION SURVEY // 
						// QUANT //
						var performance     = surveys[i].FSE_Job_Performance__c;

						// LONG FORM //
						var workStrengh     = surveys[i].FSE_Did_Well_at_Work__c;
						var workImprove     = surveys[i].FSE_Improve_at_Work__c;

				}
				
				console.log(surveys);
				res.render('users', 
				{
					test           : fellowId,
					contactInfo    : contactInfo,
					companyInfo    : companyInfo,
					supervisorInfo : supervisorInfo
				});			
		});

	});

	// here is where i send the data

});

module.exports = router;
