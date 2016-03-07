angular.module('vfaDashboard').controller('ContactCtrl', function($scope, _, api, accountsApi) {

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
		Title: '',
		AccountId: '',
		OwnerId: '',
		VFA_City__c: ''

	}

	$scope.mostRecentContact = 0;
	$scope.contactInProgress = false;
	$scope.contactFailed = 0;
	$scope.createContact = function createContact(contact) {
		console.log('contact client-side: ', contact);
		$scope.contactInProgress = true;
		$scope.contactFailed = 0;
		$scope.mostRecentContact = 0;

		
		// console.log('contact data', contact);
		api.contacts.create(contact).then(function(data) {
			$scope.contactInProgress = false;
			$scope.mostRecentContact = data.id;

			$scope.contact = {
				FirstName: '',
				LastName: '',
				Email: '',
				Title: '',
				AccountId: '',
				OwnerId: '',
				VFA_City__c: ''

			}
			$scope.userSearch = '';
			$scope.citySearch = '';
			$scope.relatedToSearch = '';
		}, function(error) {
			$scope.contactInProgress = false;
			$scope.contactFailed = "Sorry, please try again or contact JTD";
		})
	}
})
