vfaDashboard.controller("companyCtrl", function($scope, $stateParams, api, _) {
	
	$scope.salesforceDropdownFields = {
		"CoPa_Association__c": {picklist: ["Fun", "Works"]},
		"VFA_City__c": "",
		"Industry_USE__c": "",
		"Funding_Type__c": "",
		"Funding_Amount__c": "",
		"Company_Type__c": "",
		"Product_Type__c": "",
		"Customer_Type__c": "",
		"Female_Founder__c": "",
		"Product_Type__c": "",
		"URM_Founder__c": ""
	}
					  	
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
		/*
			on to the data story
			now i've gotten the data, and i want to match it up with the appropriate situation
			actually, do i have to
			maybe i can simply {{}} into it
			for the text values will 
			now, I'm going to want to set the value of the Dom
		 */
	});

})