vfaDashboard.controller("companyCtrl", function($scope, $stateParams, $q, accountsApi, slackApi, api, _) {
	
	$scope.isEdit = false;
	$scope.relatedTo = [];
	$scope.accountId = $stateParams.companyId;

	// company info is an array of objects 
	// the array is for use organizing the html
	// the type is to specify what type of html input type it corresponds to. 
	// there's got to be a better way to do it.

	$scope.companyInfo2 = [
		"Id",
		"CoPa_Association__c",
		"Website",
		"VFA_City__c",
		"Description",
		"Year_Founded__c",
		"NumberOfEmployees",
		"Industry_USE__c",
		"Funding_Type__c",
		"Funding_Amount__c",
		"Company_Type__c",
		"Product_Type__c",
		"Customer_Type__c",
		"Female_Founder__c",
		"URM_Founder__c",
		"Twitter_Handle__c"
	];

	$scope.companyInfo = [];
	api.companies.getFields().then(function(data) {
		 var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
		 	return {name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues}
		 });

		 var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display
		 	return _.indexOf($scope.companyInfo2, field.name) >= 0;
		 });

		$scope.companyInfo = activeFields;
		api.companies.getCompany($scope.companyId).then(function(data) {
			$scope.relatedTo.push({name: data.Name, id: data.Id});
			var liveData = _.filter(data, function(value) {
				return _.indexOf($scope.companyInfo2, field.name) >= 0;
			});

			var liveCompanyInfo = _.map(liveData, function(sfData, index) {
				var index = _.indexOf(activeFields, value.name);
				return activeFields[index].value = sfData;
			})
			_.forEach(data, function(salesforceValue, key) {
				_.forEach($scope.companyInfo, function(value, index) {
					if(value.name === key) {		
						value.value = salesforceValue;
					}
				});
			});
			console.log("company info after company api:\n", $scope.companyInfo);
		}); 

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

	
	
	$scope.users;
	api.users.getAll()
		.then( function(users) {
			$scope.users = users;
		});

	$scope.getUser = function getUser(userList, id) {
	    var user = {};
	    _.find(userList, function(value) {
	    	return value.Id === id;
	    });
	    return user;
	}

	$scope.activities = [];
	accountsApi.getActivities($scope.accountId).then(function(data) {
		$scope.activities = data;
	})

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
})