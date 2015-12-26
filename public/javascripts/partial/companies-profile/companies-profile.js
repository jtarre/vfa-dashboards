vfaDashboard.controller("companyCtrl", function($scope, $stateParams, api, _) {
	
	$scope.salesforceDropdownFields = {
		"CoPa_Association__c": {picklist: ["Fun", "Works"]},
		"VFA_City__c": "",
		"Industry_USE__c": "",
		"Funding_Type__c": "",
		"Funding_Amount__c": "",
		"Company_Type__c": "",
		"Product_Type__c": "",
		"Company_Type__c": "",
		"Customer_Type__c": "",
		"Product_Type__c": "",
		"Female_Founder__c": {picklist: [{value: false, label: "No"}, {value: true, label: "Yes"}]},
		"URM_Founder__c": {picklist: [{value: false, label: "No"}, {value: true, label: "Yes"}]}
	};

	$scope.salesforceDataInUse = {
		"Id": "",
		"CoPa_Association__c": "",
		"VFA_City__c": "",
		"Industry_USE__c": "",
		"Funding_Type__c": "",
		"Funding_Amount__c": "",
		"Company_Type__c": "",
		"Product_Type__c": "",
		"Company_Type__c": "",
		"Customer_Type__c": "",
		"Female_Founder__c": "",
		"Product_Type__c": "",
		"URM_Founder__c": "",
		"Twitter_Handle__c": "",
		"Description": "",
		"Year_Founded__c": "",
		"NumberOfEmployees": ""
	};
					  	
	api.companies.getFields().then(function(response) {
		// console.log("salesforce data fields", response.fields);
		$scope.salesforceFieldData = response.fields;
		// console.log("salesforce fields", $scope.salesforceFieldData);
		// console.log("copa association", $scope.salesforceFieldData);
		_.each($scope.salesforceFieldData, function(value, index, list) {
			// console.log("label value", value.name);
			if($scope.salesforceDropdownFields.hasOwnProperty(value.name)) {
				if(value.picklistValues.length) {
					$scope.salesforceDropdownFields[value.name] = {label: value.label, picklist: value.picklistValues};
				}
			}
		});
		// console.log("salesforce dropdown fields", $scope.salesforceDropdownFields);
	});


	$scope.companyId = $stateParams.companyId;
	// console.log("company id in ctrl", $scope.companyId);
	api.companies.getCompany($scope.companyId).then(function(data) {
		$scope.salesforceData = data;
		console.log("salesforce data", $scope.salesforceData);
		_.each($scope.salesforceData, function(value, key, list) {
			if($scope.salesforceDataInUse.hasOwnProperty(key)) {
				$scope.salesforceDataInUse[key] = value;
			}
		});
	});

	$scope.logNotes = function logNotes(subject, description, vfaId, companyId) {
		api.notes.post(subject, description, vfaId, companyId, "company").then(function(response){
			console.log("note response", response);
		});
	};

	$scope.update = function update(id, salesforceData) {
		console.log("id and data on client", id, salesforceData);
		api.companies.update(id, salesforceData).then(function(response) {
			console.log("response from server after update", response);
		})
	};

	$scope.vfaTeam = [	
		{ name: "Amy Nelson", id : "005d0000001QfTE"},	
		{ name: "Andrew Yang", id : "005d0000001OKLG"},	
		{ name: "Barrie Grinberg", id : "005d0000003h7Sp"},	
		{ name: "Caroline Toch", id : "005d0000004fYCj"},	
		{ name: "Cathlin Olszewski", id : "005d00000031mtf"},	
		{ name: "Connor Schake", id : "005d0000004czLN"},	
		{ name: "Eileen Lee", id : "005d0000001OKLf"},	
		{ name: "Elisabeth Deogracias", id : "005d0000001Nsrm"},	
		{ name: "Hannah Steinhardt", id : "005d0000004czLI"},	
		{ name: "Helen Lynch", id : "005d0000004q79a"},	
		{ name: "Isa Ballard", id : "005d00000031mtk"},	
		{ name: "Jackie Miller", id : "005d0000001O6g0"},	
		{ name: "Jason Tarre", id : "005d0000001OzTa"},	
		{ name: "Joe Guy", id : "005d0000002h82C"},	
		{ name: "Katie Bloom", id : "005d00000048Li7"},	
		{ name: "Laila Selim", id : "005d00000033SpB"},	
		{ name: "Lauren Gill", id : "005d0000001OKMY"},	
		{ name: "Leandra Elberger", id : "005d0000002hE6F"},	
		{ name: "Mandy Marcus", id : "005d0000004e7gk"},	
		{ name: "Megan Hurlburt", id : "005d0000001OKMT"},	
		{ name: "Mike Tarullo", id : "005d0000001OKLz"},	
		{ name: "Mike Henrich", id : "005d0000004KHDY"},	
		{ name: "Rachel Greenspan", id : "005d0000004HrpD"},	
		{ name: "Seonhye Moon", id : "005d0000001OKMd"},	
		{ name: "Tom Griffin", id : "005d00000045mKQ"},	
		{ name: "Victor Bartash", id : "005d0000004KHDd"},	
		{ name: "Will Geary", id : "005d00000048iYF"}
	];

})