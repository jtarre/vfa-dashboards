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
	conn.login("jason@ventureforamerica.org", "1010Boobooboo!!", function(err, userInfo) {
		if ( err ) {
			// add code here not to just return an error console, but to send a response
			// view back to the browser that says try again...or something 
			return console.error(err); 
		}
		console.log("Authenticated!");

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
					Contact__c : fellowId
				},
				"*"
				)
				.sort( { CreatedDate : -1 } )
				.limit(5)
				.execute( function(err, surveys) {
					if (err) { return console.error(err); }
					console.log(surveys);
					console.log("We returned surveys!!!!");
					console.log("surveys.length: " + surveys.length);

					var companyPartnerCount = 0;
					var companyPartnerRecordId = "012d0000000SwwyAAC";

					var selfEvalCount       = 0;
					var selfEvalRecordId    = "012d0000000SxCNAA0";
					
					for (var i = 0; i < surveys.length; ++i) {
						console.log("we've gone through: " + i + " surveys");


						console.log("on pass " + i + " recordtypeid = " + surveys[i].RecordTypeId);
						console.log("for the record, company record id = " + companyPartnerRecordId);
						console.log("for the record, fellow record id = " + selfEvalRecordId);
						console.log("on pass " + i + " companyPartnerCount = " + companyPartnerCount);
						console.log("on pass " + i + " selfEvalCount = " + selfEvalCount);	
						if (companyPartnerCount == 0) {
							console.log("Made it passed first conditional!");
							if (surveys[i].RecordTypeId.toString() == companyPartnerRecordId) {
								console.log("made it passed second!");

							companyPartnerCount = companyPartnerCount + 1;
							// COMPANY PARTNER SURVEY // 
								var companyPartnerName= surveys[i].Name;
								var companyPartnerCreated= surveys[i].CreatedDate;
								
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
							}
						}

						if (selfEvalCount == 0 && surveys[i].RecordTypeId == selfEvalRecordId) {
							selfEvalCount = selfEvalCount + 1;
							// SELF-EVALUATION SURVEY // 
								var selfEvalName    = surveys[i].Name;
								var selfEvalCreatedDate= surveys[i].CreatedDate;
								// QUANT JOB //
								var performance     = surveys[i].FSE_Job_Performance__c;
								var jobHappiness    = surveys[i].FSE_Job_Happiness__c;
								var jobChallenge    = surveys[i].FSE_Job_Challenge__c;

								var salary         = surveys[i].FSE_Salary__c;
								var equity         = surveys[i].FSE_Equity__c;

								// LONG FORM JOB //
								var workStrengh     = surveys[i].FSE_Did_Well_at_Work__c;
								var workImprove     = surveys[i].FSE_Improve_at_Work__c;
								var workChallenge   = surveys[i].FSE_Challenge__c;

								// QUANT LIFE // 
								var extracurricular = surveys[i].FSE_Extracurricular__c;
								var support         = surveys[i].FSE_Support__c;
								var socialLife      = surveys[i].FSE_Social_Life__c;

								var overall         = surveys[i].FSE_Overall__c;
						}

						if (companyPartnerCount == 1) {
							companyPartnerCount = companyPartnerCount + 1;
							// DATA OBJECTS: PREP FOR WEBSITE // 
							console.log("company info: " + companyInfo);
							for (data in companyInfo) {
								console.log("company info data: " + data + " " + companyInfo[data]);
							}

							var companyPartnerQuant = 
							{
								companyEvalDate : "Company Partner Date Submitted: " + companyPartnerCreated,
								overall         : "Overall: " + overall,
								teamFit         : "Team Fit / Hustle: " + teamFit,
								problemSolving  : "Problem Solving: " + problemSolving,
								hardSkills      : "Hard Skills: " + hardSkills,
								communication   : "Communication: " + communication,
							};

							var companyPartnerLongForm = 
							{
								strength        : "Strengths:\n" + strength,
								improvement     : "Areas for Improvement:\n" + improvement

							};
							
							companyInfo.salary  = "Salary: " + salary;
							companyInfo.equity 	= "Equity: " + equity; 
								
						}
						
						if (selfEvalCount == 1) {
							selfEvalCount = selfEvalCount + 1;
							var selfEvaluationJobQuant = 
							{
								selfEvalDate    : "Self Eval Date Submitted: " + selfEvalCreatedDate,
								overall         : "Overall Satisfaction: " + overall,
								performance     : "Job Performance: " + performance,
								jobHappiness    : "Job Happiness: " + jobHappiness,
								jobChallenge    : "Job Challenge: " + jobChallenge
							};

							var selfEvaluationLifeQuant = 
							{
								support         : "Support: " + support,
								socialLife      : "Social Life: " + socialLife,
								extracurricular : "Extracurriculars: " + extracurricular

							};

							var selfEvaluationJobLongForm = 
							{
								workStrengh     : "Work Strengths:\n\n" + workStrengh,
								workImprove     : "Areas to Improve at Work:\n\n" + workImprove,
								workChallenge   : "Areas of Challenge:\n\n" + workChallenge
							};
						}

					}

					if (typeof companyPartnerQuant === "undefined") {
						console.log("company objects undefined");
						var companyPartnerQuant = {noSurvey: "No Company Partner Survey Found"};
						var companyPartnerLongForm = {};
					}

					if (typeof selfEvaluationJobQuant === "undefined") {
						console.log("self eval objects undefined");
						var selfEvaluationJobQuant = { noSurvey : "No Self Eval Found"};
						var selfEvaluationLifeQuant = {};
						var selfEvaluationJobLongForm = {};
					}

					console.log("cp quant: " + companyPartnerQuant);
					console.log("self eval quant: " + selfEvaluationJobQuant);
					
					res.render('users', 
					{
						test                      : fellowId,
						contactInfo               : contactInfo,
						companyInfo               : companyInfo,
						supervisorInfo            : supervisorInfo,
						companyPartnerQuant       : companyPartnerQuant,
						companyPartnerLongForm    : companyPartnerLongForm,
						selfEvaluationLifeQuant   : selfEvaluationLifeQuant,
						selfEvaluationJobQuant    : selfEvaluationJobQuant,
						selfEvaluationJobLongForm : selfEvaluationJobLongForm, 
					});	
			});

		});
	});
});

module.exports = router;
