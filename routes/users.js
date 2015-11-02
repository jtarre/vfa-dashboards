var express   = require('express');
var router    = express.Router();
var jsforce   = require('jsforce');
var _         = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("get!");
	var fellowId = req.param('id');
	console.log("id: " + fellowId);
	// todo: get the data

	var conn = new jsforce.Connection({    
		loginUrl : process.env.LOGIN_URL,
	    clientSecret: process.env.CLIENT_SECRET, 
	    redirectUri: process.env.REDIRECT_URI,
	    clientId: process.env.CLIENT_ID,
	    instanceUrl: process.env.INSTANCE_URL
	}); 
	
	// login to salesforce. after this, can run all functions
	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if ( err ) {
			// add code here not to just return an error console, but to send a response
			// view back to the browser that says try again...or something 
			return console.error(err); 
		}
		console.log("Authenticated!");

		conn.sobject("Contact").retrieve(fellowId, function(err, contact) {
			if (err) { 
				return console.error(err);
			}
			
			var fellowUrl = process.env.INSTANCE_URL + "/" + fellowId;
			fellowUrl.toString();

			console.log("Fellow Contact Data\n\n");
			for (data in contact) {
				//console.log("key: " + data + " value: " + contact[data]);
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
					//console.log(surveys);
					console.log("We returned surveys!!!!");
					console.log("surveys.length: " + surveys.length);

					var companyPartnerCount = 0;
					var companyPartnerRecordId = "012d0000000SwwyAAC";

					var selfEvalCount       = 0;
					var selfEvalRecordId    = "012d0000000SxCNAA0";

					/// TODO: 2016 FORM SURVEY ////
					
					for (var i = 0; i < surveys.length; ++i) {
						/*
						console.log("we've gone through: " + i + " surveys");


						console.log("on pass " + i + " recordtypeid = " + surveys[i].RecordTypeId);
						console.log("for the record, company record id = " + companyPartnerRecordId);
						console.log("for the record, fellow record id = " + selfEvalRecordId);
						console.log("on pass " + i + " companyPartnerCount = " + companyPartnerCount);
						console.log("on pass " + i + " selfEvalCount = " + selfEvalCount);	
						*/
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
					conn.sobject("Case")
						.find(
						{
							ContactId : fellowId
						},
						"*")
						.sort( { CreatedDate: -1 } )
						.limit(5)
						.execute( function(err, cases) {
							if ( err ) {
								// add code here not to just return an error console, but to send a response
								// view back to the browser that says try again...or something 
								return console.error(err); 
							}
							// TODO: GRAB DATA
							console.log("////////////// CASES /////////////");
							//console.log(cases);
							
							//var caseList = {};
							var fellowCase = {};
							var caseList = {};
							console.log("//////////// MAKING CASES ////////////");
							console.log("cases length: " + cases.length);
							for ( var i = 0; i < cases.length; ++i ) {
								// GET CASE URL, DESCRIPTION, AND CREATED DATE // 
								//console.log("I = " + i);
								//console.log("cases length inside for loop: " + cases.length);
								var id          = cases[i].Id;
								var createdDate = cases[i].CreatedDate;
								var url         = process.env.INSTANCE_URL + id;
								var description = cases[i].Description;
								var subject     = cases[i].Subject;

								console.log("///////// ADDING CASE /////////");
								console.log(subject);
								
								fellowCase = {
										createdDate : "CreatedDate: " + createdDate,
										url         : "URL: " + url,
										description : "Description: " + description 
									};
								(function () {
									caseList[subject] = fellowCase;
								})();
							}

							conn.sobject("Task")
								.find(
								{
									WhoId  : fellowId,
									Status : "Completed"
								},
								"Subject, Description, WhoId, Status, CreatedDate, Id, OwnerId")
								.sort( { CreatedDate: -1 } )
								.limit(5)
								.execute( function (err, activities) {
									var activitiesList = {};

									//console.log("\n/// LET'S GET ACTIVITIES ///");
									//console.log(activities);
									var ownerName = "";
									var ownerIdCut = "";
									var ownerIdLong = "";
									var url = "";
									var shortDescription = "";

									//console.log(vfaList);
									console.log("Activites length: " + activities.length);
									_.each(activities, function (element, index, list) {

										ownerIdLong = element.OwnerId.toString();
										ownerIdCut = ownerIdLong.substring(0, ownerIdLong.length - 3 );

										//console.log("short owner id: " + ownerIdCut);
										

										if(ownerIdCut in vfaList) {
											ownerName = vfaList[ownerIdCut].toString();
											if (ownerName === null) {
												ownerName = "Name not available";
											} 	
										}
										
										
										//console.log("owner name: " + ownerName);

										//console.log("Owner Id: " + element.OwnerId);

										
										console.log("Iteration Number: " + index);
										console.log("\nActivity Subject Line: " + element.Subject.toString());
										console.log("Owner Name: " + ownerName.toString());
										console.log("Activity ID: " + element.Id.toString());
										console.log("Created Date: " + element.CreatedDate.toString());
										// console.log("Description: " + element.Description.toString() + "\n");

										if (element.Description !== null) {
											if(element.Description.length > 200) {
												shortDescription = element.Description;
											} else {
												shortDescription = element.Description;
											}
										}
										

										url = process.env.INSTANCE_URL + "/" + element.Id.toString();
										url.toString();
										activitiesList[element.Subject.toString()] = 
										{
											createdBy   : ownerName.toString(),
											createdDate : element.CreatedDate.toString(),
											url         : url,
											description : shortDescription
										};
										//console.log("Activity Element: " + activitiesList[element.Subject].url);
									});

									//console.log("/// ACTIVITIES LIST /// ");
									// console.log(activitiesList);
									//console.log("test");

									res.render('users', 
									{
										fellowUrl                 : fellowUrl,
										test                      : fellowId,
										activityList              : activitiesList,
										caseList                  : caseList,
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
	});
  var vfaList = 
  {	 
  	"005d0000001QfTE"   :     "Amy Nelson"  ,	
	  "005d0000001OKLG"   :     "Andrew Yang"  ,	
	  "005d0000003h7Sp"   :     "Barrie Grinberg"  ,	
	  "005d00000031mtf"   :     "Cathlin Olszewski"  ,	
	  "005d0000004czLN"   :     "Connor Schake"  ,	
	 "005d0000001OKLf"   :     "Eileen Lee"  ,	
	 "005d0000001Nsrm"   :     "Elisabeth Deogracias"  ,	
	 "005d00000031CfS"   :     "Eric Caballero"  ,	
	  "005d0000004HJPG"   :     "Fabio DeSousa"  ,	
	  "005d0000004czLI"   :     "Hannah Steinhardt"  ,	
	  "005d00000031mtk"   :     "Isa Ballard"  ,	
	  "005d0000001O6g0"   :     "Jackie Miller"  ,	
	  "005d0000001OzTa"   :     "Jason Tarre"  ,	
	  "005d0000002h82C"   :     "Joe Guy"  ,	
	  "005d00000048Li7"   :     "Katie Bloom"  ,	
	  "005d00000033SpB"   :     "Laila Selim"  ,	
	  "005d0000001OKMY"   :     "Lauren Gill"  ,	
	  "005d0000003gu2P"   :     "Lauren Kahn"  ,	
	 "005d0000002hE6F"   :     "Leandra Elberger"  ,	
	 "005d0000004e7gk"   :     "Mandy Marcus"  ,	
	 "005d0000001OKMT"   :     "Megan Hurlburt"  ,	
	 "005d0000001OKLz"   :     "Mike Tarullo"  ,	
	 "005d0000004KHDY"   :     "Mike Henrich"  ,	
	 "005d0000004HrpD"   :     "Rachel Greenspan"  ,	
	 "005d0000001OKMd"   :     "Seonhye Moon"  ,	
	  "005d0000004eY8B"   :     "Shira Sacks"  ,	
	 "005d0000003gMhs"   :     "Splash Admin"  ,	
	  "005d0000004IjzW"   :     "Taylor Davidson"  ,	
	  "005d00000045mKQ"   :     "Tom Griffin"  ,	
	 "005d0000004KHDd"   :     "Victor Bartash"  ,	
	 "005d00000048iYF"  :     "Will Geary"  	
	};
});

module.exports = router;
