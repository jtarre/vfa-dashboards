vfaDashboard.controller("companyCtrl", function($scope, $stateParams, slackApi, api, _) {
	
	$scope.isEdit = false;
	$scope.relatedTo = [];
	$scope.companyId = $stateParams.companyId;

	// company info is an array of objects 
	// the array is for use organizing the html
	// the type is to specify what type of html input type it corresponds to. 
	// there's got to be a better way to do it.
	$scope.companyInfo = [
		{name: "Id", type: "hidden", value: "", label: ""},
		{name: "CoPa_Association__c", type: "picklist", value: "", label: ""},
		{name: "Website", type: "text", value: "", label: ""},
		{name: "VFA_City__c", type: "picklist", value: "", label: ""},
		{name: "Description", type: "textarea", value: "", label: ""},
		{name: "Year_Founded__c", type: "text", value: "", label: ""},
		{name: "NumberOfEmployees", type: "text", value: "", label: ""},
		{name: "Industry_USE__c", type: "picklist", value: "", label: ""},
		{name: "Funding_Type__c", type: "picklist", value: "", label: ""},
		{name: "Funding_Amount__c", type: "picklist", value: "", label: ""},
		{name: "Company_Type__c", type: "picklist", value: "", label: ""},
		{name: "Product_Type__c", type: "picklist", value: "", label: ""},
		{name: "Customer_Type__c", type: "picklist", value: "", label: ""},
		{name: "Female_Founder__c", type: "picklist", value: "", label: ""},
		{name: "URM_Founder__c", type: "picklist", value: "", label: ""},
		{name: "Twitter_Handle__c", type: "text", value: "", label: ""}
	];

	api.companies.getFields().then(function(response) {
		// console.log("salesforce data fields", response.fields);
		_.forEach(response.fields, function(salesforceField, index) {
			_.forEach($scope.companyInfo, function(field, index) {
				if(field.name === salesforceField.name) {
					field.label = salesforceField.label;
					if(salesforceField.picklistValues.length) {
						field.picklist = [];
						_.forEach(salesforceField.picklistValues, function(value, index) {
							field.picklist.push(value.value);
						});
						field.picklistSearchText = salesforceField.name + 'Search'; // for the md-autocomplete
					}
				}	
			});
		});
		// console.log("company info after field api:\n", $scope.companyInfo);
	});
	api.companies.getCompany($scope.companyId).then(function(data) {
		$scope.relatedTo.push({name: data.Name, id: data.Id});
		_.forEach(data, function(salesforceValue, key) {
			_.forEach($scope.companyInfo, function(value, index) {
				if(value.name === key) {		
					value.value = salesforceValue;
				}
			});
		});
		console.log("company info after company api:\n", $scope.companyInfo);
	});

	$scope.contacts;
	api.companies.getContacts($scope.companyId)
		.then( function(contacts) {
			$scope.contacts = contacts;
		});

	$scope.opportunities;
	api.opportunities.getForCompany($scope.companyId)
		.then( function(opportunities) {
			$scope.opportunities = opportunities;
			_.forEach(opportunities, function(value, index) {
				$scope.relatedTo.push({name: value.Name, id: value.Id });	
			});
			
		});

	$scope.update = function update(companyInfo) {
		var salesforceData = {};
		_.forEach(companyInfo, function(salesforceField, index) {
			salesforceData[salesforceField.name] = salesforceField.value;
		});
		console.log("id and data on client", salesforceData);
		api.companies.update(salesforceData).then(function(response) {
			console.log("response from server after update", response);
		});
	};
	
	$scope.users;
	api.users.getAll()
		.then( function(users) {
			$scope.users = users;
		});

	$scope.getUser = function getUser(userList, id) {
	    var user = {};
	    _.each(userList, function(value, index) {
	    	if(value.Id === id) {
	    		// console.log("ids:", value.Id, id);
	    		user = value;
	    		return user;
	    	}
	    });
	    return user;
	}
})