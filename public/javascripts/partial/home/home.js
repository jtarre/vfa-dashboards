vfaDashboard.controller("homeCtrl", function($scope, $q, _, auth, api, accountsApi) {
	auth.isLoggedIn().then(function(result) {
		if(result) {
			$scope.auth = true;
		} else {
			$scope.auth = false;
		}
	});

	$scope.isFellow = false;
	$scope.isContact = false;
	$scope.isCompany = false;

	$scope.getRecords = function getRecords(search) {
		// TODO
		// merge both lists

		// basically same method, opportunity for composition
		// base method, pass in function
		// that would be fun. would it work. 
		var getContacts = function getContacts(search) {

		}

		var getAccounts = function getAccounts(search) {

		}
		var mergeData = function(data1, data2) {
			return $q.all([data1, data2]).then(function(value) {
				/*
					what will data look like?
					two arrays of objects 
					concat
					get list 1
					have to make them into promises
					for companyInfo, if fellow record type 
					return value + type: fellow
					else: type: contact
					for company return value + type: account
					if recordtype = fellow
						value["ty[e"] = fellow
					else
						value[tu[e]] = contact
					return value

					with company
					value[type] = account
					return value
				 */
			})
		}

		mergeData(getContacts(search), getAccounts(search));
	}

	/*
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
	 */



	$scope.searchContacts = function searchContacts(search) {
		$scope.contactSfSearch = true;
			$scope.isContactSearchInProgress = true;
			$scope.noContactsFound = false;
			$scope.contacts = [];
			api.contacts.getBySearch(search).then(function(data) {
				console.log("note logger ctrl response: ", data);
				$scope.isContactSearchInProgress = false;
				if(data.length) {
					$scope.contacts = data;	
				} else {
					$scope.noContactsFound = true;
				}
				
			});
	}

	$scope.searchAccounts = function searchAccounts(search) {
		$scope.relatedToSfSearch = true;
		$scope.isRelatedToSearchInProgress = true;
		$scope.relatedTo = [];
		$scope.noCompaniesFound = false;
		accountsApi.getBySearch(search).then(function(data) {
			console.log("note logger ctrl response: ", data);
			$scope.isRelatedToSearchInProgress = false;
			if(data.length) {
				$scope.relatedTo = data;	
			} else {
				$scope.noCompaniesFound = true;
			}
		});
	}
	

});