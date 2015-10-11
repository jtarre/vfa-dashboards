var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');

router.get('/', function( req, res, next) {
	var conn = new jsforce.Connection({
		clientSecret: process.env.CLIENT_SECRET,
		clientId:     process.env.CLIENT_ID,
		loginUrl:     process.env.LOGIN_URL,
		instanceUrl:  process.env.INSTANCE_URL,
		redirectUri: process.env.REDIRECT_URI
	});

	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if (err) { return console.error(err); }
		conn.sobject('Account')
			.find(
			{
				"Department__c" : "Company Partnerships"
			},
			'Name, Id')
			.sort({ Name : 1 }) // Sort Alphabetically A->Z
			.execute( function ( err, accounts ) {
				
				// PULL COMPANIES IN DEPARTMENT COMPANY PARTNERSHIPS // 
				var companies = {};
				console.log("///// ACCOUNTS ////")
				for ( var i = 0; i < accounts.length; ++i) {
					companies[accounts[i].Name] = accounts[i].Id;
					//console.log("// companies[i] //");
					//console.log("Key: " + accounts[i].Name);
					//console.log("Value: " + companies[accounts[i].Name]);
				}

				// DROPDOWN FIELDS TIME // 
				conn.sobject("Account").describe(function(err, meta) {
				  if (err) { return console.error(err); }
				  console.log('\n\nLabel : ' + meta.label);
				  console.log('Num of Fields : ' + meta.fields.length);
				  
				  // ACCOUNT META-DATA //
				  var city            = {};
				  var fundingAmount   = {};
				  var companyType     = {};
				  var customerType    = {};
				  var productType     = {};

				  // pull metafields
				  for (var j = 0; j < meta.fields.length; ++j) {
				  	
				  	var currentField = meta.fields[j];
				  	

				  	// CITY // 
				  	if (currentField.name == "VFA_City__c") {
				  		console.log("\n// city meta-field api name //");
				  		console.log(currentField);
				  		for (var o = 0; o < currentField.picklistValues.length; ++o) {
				  			city[currentField.picklistValues[o].label] = currentField.picklistValues[o].value;
				  			console.log("CITY AT: " + o);
				  			console.log("KEY: " + currentField.picklistValues[o].label);
				  			console.log("VALUE: " + currentField.picklistValues[o].value);
				  		}
				  	}


				  	// FUNDING AMOUNT // 
				  	
				  	if (meta.fields[j].name == "Funding_Amount__c") {
				  		console.log("// funding amount meta-field api name //");
				  		console.log(meta.fields[j]);
				  		var fundingPicklist = meta.fields[j].picklistValues;
				  		console.log(meta.fields[j].picklistValues);
				  		for (var k = 0; k < fundingPicklist.length; ++k) {
				  			console.log("\nfunding picklist at: " + k);
				  			console.log(fundingPicklist[k].value);
				  			fundingAmount[fundingPicklist[k].label] = fundingPicklist[k].value;
				  			console.log("Key: " + fundingPicklist[k].label);
							console.log("Value: " + fundingAmount[fundingPicklist[k].label]);
				  		}
				  	}

				  	// DESCRIPTION // 

				  	// YEAR FOUNDED // 

				  	// FUNDING TYPE // 

				  	// FEMALE FOUNDER // 
				  	var femaleFounder;
				  	if (currentField.name == "Female_Founder__c") {
				  		console.log("// female founder meta-field api name //");
				  		console.log(currentField);
				  	}

				  	// URM FOUNDER // 

				  	// EMPLOYEES // 
				  	var numberOfEmployees;
				  	if (currentField.name == "NumberOfEmployees") {
				  		console.log("// employees meta-field api name //");
				  		console.log(currentField);
				  	}

				  	// COMPANY TYPE //
				  	if (currentField.name == "Company_Type__c") {
				  		console.log("\n// company type meta-field api name //");
				  		console.log(currentField);
				  		for (var l = 0; l < currentField.picklistValues.length; ++l) {
				  			companyType[currentField.picklistValues[l].label] = currentField.picklistValues[l].value;
				  			console.log("COMPANY TYPE AT: " + l);
				  			console.log("KEY: " + currentField.picklistValues[l].label);
				  			console.log("VALUE: " + currentField.picklistValues[l].value);
				  		}
				  	}

				  	// CUSTOMER TYPE // 
				  	if (currentField.name == "Customer_Type__c") {
				  		console.log("\n// customer type meta-field api name //");
				  		console.log(currentField);
				  		for (var m = 0; m < currentField.picklistValues.length; ++m) {
				  			customerType[currentField.picklistValues[m].label] = currentField.picklistValues[m].value;
				  			console.log("CUSTOMER TYPE AT: " + m);
				  			console.log("KEY: " + currentField.picklistValues[m].label);
				  			console.log("VALUE: " + currentField.picklistValues[m].value);
				  		}
				  	}

				  	// PRODUCT TYPE // 
				  	if (currentField.name == "Product_Type__c") {
				  		console.log("\n// product type meta-field api name //");
				  		console.log(currentField);
				  		for (var n =0; n < currentField.picklistValues.length; ++n) {
				  			productType[currentField.picklistValues[n].label] = currentField.picklistValues[n].value;
				  			console.log("PRODUCT TYPE AT: " + n);
				  			console.log("KEY: " + currentField.picklistValues[n].label);
				  			console.log("VALUE: " + currentField.picklistValues[n].value);	
				  		}
				  	}
				  }

				  console.log("Funding Amount: " + fundingAmount);
				  res.render('companies', 
					{
						accounts:       companies,
						city:           city,
						fundingAmount:  fundingAmount,
						companyType:    companyType,
						customerType:   customerType,
						productType:    productType,
						vfaList:        vfaList
					});
				});
				
			});
	});
	var vfaList = 
	  { 
	    ""            : "",
	    "Amy Nelson"  : "005d0000001QfTE",  
	    "Andrew Yang"  :  "005d0000001OKLG",  
	    "Barrie Grinberg"  :  "005d0000003h7Sp",  
	    "Cathlin Olszewski"  :  "005d00000031mtf",  
	    "Connor Schake"  :  "005d0000004czLN",  
	    "Eileen Lee"  : "005d0000001OKLf",  
	    "Elisabeth Deogracias"  : "005d0000001Nsrm",  
	    "Eric Caballero"  : "005d00000031CfS",  
	    "Fabio DeSousa"  :  "005d0000004HJPG",  
	    "Hannah Steinhardt"  :  "005d0000004czLI",  
	    "Isa Ballard"  :  "005d00000031mtk",  
	    "Jackie Miller"  :  "005d0000001O6g0",  
	    "Jason Tarre"  :  "005d0000001OzTa",  
	    "Joe Guy"  :  "005d0000002h82C",  
	    "Katie Bloom"  :  "005d00000048Li7",  
	    "Laila Selim"  :  "005d00000033SpB",  
	    "Lauren Gill"  :  "005d0000001OKMY",  
	    "Lauren Kahn"  :  "005d0000003gu2P",  
	    "Leandra Elberger"  : "005d0000002hE6F",  
	    "Mandy Marcus"  : "005d0000004e7gk",  
	    "Megan Hurlburt"  : "005d0000001OKMT",  
	    "Mike Tarullo"  : "005d0000001OKLz",  
	    "Mike Henrich"  : "005d0000004KHDY",  
	    "Rachel Greenspan"  : "005d0000004HrpD",  
	    "Seonhye Moon"  : "005d0000001OKMd",  
	    "Shira Sacks"  :  "005d0000004eY8B",  
	    "Splash Admin"  : "005d0000003gMhs",  
	    "Taylor Davidson"  :  "005d0000004IjzW",  
	    "Tom Griffin"  :  "005d00000045mKQ",  
	    "Victor Bartash"  : "005d0000004KHDd",  
	    "Will Geary"  : "005d00000048iYF" };
});

module.exports = router;