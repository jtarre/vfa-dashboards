angular.module('vfaDashboard').controller('CaseCtrl', function($scope, _, api, casesApi) {
	api.users.getAll().then(function(data) {
		$scope.users = data;
	});

	casesApi.getTypes().then(function(data) {
		$scope.caseTypes = _.map(data.picklistValues, 'value');
		console.log("case types: ", $scope.caseTypes);
		}, function(error) { 
			console.log(error);
		});

	$scope.contacts = [];
	$scope.contactSearch = "";
	$scope.isContactSearchInProgress = false;
	$scope.noContactsFound = false;
	$scope.noContactsFoundMessage = "No Contacts Found. Search Again";
	$scope.$watch('contactSearch', function(newValue) {
		if(newValue.length > 5) { 
			if(!$scope.isContactSearchInProgress) {
				$scope.searchContacts(newValue);	
			}	
		}

		if(newValue.length <= 5) { // reset if person deletes name
			if($scope.isContactSearchInProgress) {
				$scope.isContactSearchInProgress = false;
			}
		}
	});

	$scope.searchContacts = function searchContacts(search) {
		$scope.isContactSearchInProgress = true; // this really should be applied to the method, not tied on client-side.
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

	$scope.createCase = function createCase(newCase) {
		console.log("new case before map", newCase);

		newCase = _.map(newCase, function(newCaseInput, inputKey) { // i think i'm confused by references and actual values. 
			console.log("input value:",newCaseInput);
			if(_.isNull(newCaseInput)) {
				console.log("input is null");
				newCaseInput = "";
			} 
			console.log("input value after checking null status:", newCaseInput);
			return newCaseInput;
		});
		console.log("new case after map", newCase);

		// casesApi.create(newCase.Subject, newCase.Description, newCase.user, newCase.contact, newCase.type);
	}
})