vfaDashboard.controller("companyCtrl", function($scope, $stateParams, api, _) {
	
	$scope.isEdit = false;

	$scope.companyInfo = [
		{"Id": ""},
		{"CoPa_Association__c": {isPicklist: true, picklist: "", value: ""}},
		{"Description": {isPicklist: false,  value: ""}},
		{"VFA_City__c": {isPicklist: true, picklist: "", value: ""}},
		{"Industry_USE__c": {isPicklist: true, picklist: "", value: ""}},
		{"Funding_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"Funding_Amount__c": {isPicklist: true, picklist: "", value: ""}},
		{"Company_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"Product_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"Company_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"Customer_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"Female_Founder__c": {isPicklist: true, picklist: "", value: ""}},
		{"Product_Type__c": {isPicklist: true, picklist: "", value: ""}},
		{"URM_Founder__c": {isPicklist: true, picklist: "", value: ""}},
		{"Twitter_Handle__c": {isPicklist: false, value: ""}},
		{"Year_Founded__c": {isPicklist: false, value: ""}},
		{"NumberOfEmployees": {isPicklist: false, value: ""}},
		{"Website": {isPicklist: false, value: ""}}
	];
	// Edit / Not-edit
	// <div ng-repeat="list in lists">
	// 	{{list.city}}
	// 	<input ngif="findType(list) === 'text'">
	// 	<select ngif="findType(list) === 'text'" ></select>
	// 	<p ngif="!isEdit">{{list.name}}</p>

	// </div>
					  	
	api.companies.getFields().then(function(response) {
		_.each($scope.salesforceFieldData, function(value, index, list) {
			
			if($scope.companyInfo[value.name].isPicklist) {
				$scope.companyInfo[value.name]
					.picklist = {
						label: value.label, 
						picklistValues: value.picklistValues
					};
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

})