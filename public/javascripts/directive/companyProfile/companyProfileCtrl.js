angular.module('vfaDashboard').controller('companyProfileCtrl', function($scope, _, api, supportersApi, $q) {
	$scope.isEdit = false;
	$scope.relatedTo = [];

	console.log('scope id', $scope.id);
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

	var contactFields = [
		'Name',
		'FirstName',
		'LastName',
		'Phone',
		'Email',
		'Title',
		'Description'
	];

	var getMetaFieldsPromise = function getMetaFieldsPromise(fields, apiPromise) {
		var deferred = $q.defer();
		apiPromise.then(function(data) {
			 var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
			 	return {name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues}
			 });

			 var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display
			 	return _.indexOf(fields, field.name) >= 0;
			 });
			 console.log('meta fields: ', activeFields);
			 deferred.resolve(activeFields);
		});
		return deferred.promise;
	};

	var getRecordInfo = function getRecordInfo(fields, apiPromise) {
		var deferred = $q.defer();
		apiPromise.then(function(data) {
			console.log('record promise data: ', data);
			var allData = _.map(data, function(field, key) {
				return {name: key, value: field};
			});
			console.log('all data', allData);
			var liveData = _.filter(allData, function(field) {
				return _.indexOf(fields, field.name) >= 0;
			})
			console.log('record data: ', liveData);
			deferred.resolve(liveData);
			// console.log('company data', allData);
		}); 
		return deferred.promise;
	};

	var getChildRecords = function getChildRecords(activeFields, apiPromise) {
		var deferred = $q.defer();
		apiPromise.then(function(children) {
			// console.log('return children: ', children);
			var slimChildren = _.map(children, function(values) {
				var cf = _.map(values, function(value, key) {
					return {name: key, value: value};
				});

				console.log('cf: ', cf);

				return _.filter(cf, function(contactField) {
					return _.includes(activeFields, contactField.name);
				})
			});

			// console.log('children fix: ', childrenFix);
			deferred.resolve(slimChildren);
		});	
		return deferred.promise;	
	}; 
	


	var getRecordData = function getRecordData(fieldsPromise, companyInfoPromise) {
	  		var deferred = $q.defer();
	    	return $q.all([fieldsPromise, companyInfoPromise]).then(function(values) {
	    		console.log('values', values[0], values[1]);
	    		var data = _.map(values[0], function(field, index) {
	    			var val = _.find(values[1], function(value) {
	    				return value.name === field.name;
	    			});
	    			// console.log('val', val);
	    			field.value = val.value;
	    			return field;
	    		})
	  			deferred.resolve(data);
	    	})
	    	return deferred.promise;
	}

	getRecordData(getMetaFieldsPromise($scope.companyInfo, api.companies.getFields()), getRecordInfo($scope.companyInfo, api.companies.getCompany($scope.id)))
	.then(function(data) {
		$scope.companyData = data;
	})

	getRecordData(getMetaFieldsPromise(contactFields, api.contacts.getFields()), getChildRecords(contactFields, api.companies.getContacts($scope.id)))
	.then(function(contacts) {
		$scope.contacts = contacts;
	})
		

	// $scope.contacts;
	// api.companies.getContacts($scope.id)
	// 	.then( function(contacts) {
	// 		console.log("contacts", contacts);
	// 		if(contacts.length) {
	// 			$scope.contacts = contacts;	
	// 		}
			
	// 	});

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


		// var getCompanyFields = function getCompanyFields() {
	// 	var deferred = $q.defer();
	// 	api.companies.getFields().then(function(data) {
	// 		 var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
	// 		 	return {name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues}
	// 		 });

	// 		 var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display
	// 		 	return _.indexOf($scope.companyInfo, field.name) >= 0;
	// 		 });
	// 		 deferred.resolve(activeFields);
	// 	});
	// 	return deferred.promise;
	// };

	// var getCompanyInfo = function getCompanyInfo() {
	// 	var deferred = $q.defer();
	// 	api.companies.getCompany($scope.id).then(function(data) {
	// 		$scope.relatedTo.push({name: data.Name, id: data.Id});
	// 		// console.log('data', data);
	// 		var allData = _.map(data, function(field, key) {
	// 			return {name: key, value: field};
	// 		});
	// 		// console.log('all data', allData);
	// 		var liveData = _.filter(allData, function(field) {
	// 			return _.indexOf($scope.companyInfo, field.name) >= 0;
	// 		})
	// 		// console.log('company data', liveData);
	// 		deferred.resolve(liveData);
	// 		// console.log('company data', allData);
	// 	}); 
	// 	return deferred.promise;
	// };





})