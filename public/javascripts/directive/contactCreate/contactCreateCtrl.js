angular.module('vfaDashboard').controller('ContactCtrl', function($scope, _, api) {

	$scope.userSearch = '';
	$scope.citySearch = '';
	$scope.relatedToSearch = '';

	api.contacts.getCities().then(function(data) {
		$scope.cities = data;	
	})

	api.users.getAll().then(function(data) {
		$scope.users = data;
	})

	$scope.recordTypes = {
		"Company Partnerships": "012d0000000StyN",
		"General": "012d0000000StyM"
	}

	$scope.relatedTo = [];
	$scope.relatedToSearch = "";
	$scope.relatedToSfSearch = false;
	$scope.isRelatedToSearchInProgress = false;
	$scope.noCompaniesFound = false;
	$scope.noCompaniesFoundMessage = "No Accounts Found. Search Again";
	$scope.$watch('relatedToSearch', function(newValue) {
		// console.log("new value = value & length:", newValue, newValue.length);
		if(newValue.length > 4) {
			if(!$scope.relatedToSfSearch) {
				$scope.searchAccounts(newValue);
			}
		}

		if(newValue.length <= 4) { // reset if person deletes name
			if($scope.relatedToSfSearch) {
				$scope.relatedToSfSearch = false;
			}
		}
	});

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

	$scope.contact = {
		FirstName: '',
		LastName: '',
		Email: '',
		Account: 0,
		VFA_City: ''

	}

	$scope.mostRecentContact = 0;
	$scope.contactInProgress = false;
	$scope.contactErrorMessage = 0;
	$scope.createContact = function createContact(contact, account) {
		$scope.contactInProgress = true;
		$scope.contactErrorMessage = 0;
		$scope.mostRecentContact = 0;

		api.contacts.create(contact).then(function(data) {
			$scope.contactInProgress = false;
			$scope.contact = {
				FirstName: '',
				LastName: '',
				Email: '',
				Account: 0,
				VFA_City: ''

			}
			$scope.userSearch = '';
			$scope.citySearch = '';
			$scope.relatedToSearch = '';
		}, function(error) {
			$scope.contactErrorMessage("Sorry, please try again or contact JTD");
		})
	}
})