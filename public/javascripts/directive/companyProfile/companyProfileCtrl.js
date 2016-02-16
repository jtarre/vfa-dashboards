angular.module('vfaDashboard').controller('companyProfileCtrl', function($scope, _, api, supportersApi, $q) {
	$scope.isEdit = false;
	$scope.relatedTo = [];

	$scope.companyInfo = [
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

	var getCompanyFields = function getCompanyFields() {
		var deferred = $q.defer();
		api.companies.getFields().then(function(data) {
			 var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
			 	return {name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues}
			 });

			 var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display
			 	return _.indexOf($scope.companyInfo, field.name) >= 0;
			 });
			 deferred.resolve(activeFields);
		});
		return deferred.promise;
	};

	var getCompanyInfo = function getCompanyInfo() {
		var deferred = $q.defer();
		api.companies.getCompany($scope.id).then(function(data) {
			$scope.relatedTo.push({name: data.Name, id: data.Id});
			// console.log('data', data);
			var allData = _.map(data, function(field, key) {
				return {name: key, value: field};
			});
			// console.log('all data', allData);
			var liveData = _.filter(allData, function(field) {
				return _.indexOf($scope.companyInfo, field.name) >= 0;
			})
			// console.log('company data', liveData);
			deferred.resolve(liveData);
			// console.log('company data', allData);
		}); 
		return deferred.promise;
	};

	var mergeCompanyData = function mergeCompanyData(fieldsPromise, companyInfoPromise) {
	    	return $q.all([fieldsPromise, companyInfoPromise]).then(function(values) {
	    		// console.log('values', values[0], values[1]);
	    		var data = _.map(values[0], function(field, index) {
	    			var val = _.find(values[1], function(value) {
	    				return value.name === field.name;
	    			});
	    			// console.log('val', val);
	    			field.value = val.value;
	    			return field;
	    		})
	    		console.log('data', data);
	    		$scope.companyInfo = data;
	    	})
	}

	mergeCompanyData(getCompanyFields(), getCompanyInfo());
		

	$scope.contacts;
	api.companies.getContacts($scope.id)
		.then( function(contacts) {
			console.log("contacts", contacts);
			if(contacts.length) {
				$scope.contacts = contacts;	
			}
			
		});

	$scope.opportunities;
	api.opportunities.getForCompany($scope.id)
		.then( function(opportunities) {
			if(opportunities.length) {
				$scope.opportunities = opportunities;	
			}
			
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
	    var user = _.find(userList, function(value) {
	    	return value.Id === id;
	    });
	    return user;
	}

	$scope.activities = [];
	supportersApi.getActivities($scope.id).then(function(data) {
		if(data.length) {
			$scope.activities = data;	
		}
		
	})

	$scope.recentlyUpdated = false;
	$scope.updateInProgress = false;
	$scope.updateErrorMessage = false;
	$scope.update = function update(companyInfo) {
		$scope.recentlyUpdate = false;
		$scope.updateInProgress = true;
		$scope.updateErrorMessage = false;
		var salesforceData = {};
		_.forEach(companyInfo, function(salesforceField, index) {
			salesforceData[salesforceField.name] = salesforceField.value;
		});
		console.log("id and data on client", salesforceData);
		api.companies.update(salesforceData).then(function(response) {
			console.log("response from server after update", response);
			$scope.updateInProgress = false;
			$scope.recentlyUpdated = "https://na14.salesforce.com/" + response.id;
		}, function(error) {
			$scope.updateErrorMessage = "Sorry, please try again or contact JTD.";
		});
	};
})