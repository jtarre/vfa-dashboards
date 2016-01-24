angular.module('vfaDashboard').controller('AccountCtrl', function($scope, _, api, accountsApi) {

	$scope.userSearch = '';
	$scope.citySearch = '';
	$scope.relatedToSearch = '';

	api.contacts.getCities().then(function(data) {
		$scope.cities = data;	
	})

	api.users.getAll().then(function(data) {
		$scope.users = data;
	})

	$scope.departmentTypes = [
		"Company Partnerships",
		"Development",
		"Operations",
		"Programs",
		"Recruitment",
		"Communications",
	];

	$scope.account = {
		Name: '',
		Website: '',
		Department__c: '',
		OwnerId: '',
		VFA_City__c: ''
	}

	$scope.user = 0;
	$scope.account = 0;

	$scope.mostRecentAccount = 0;
	$scope.accountInProgress = false;
	$scope.accountFailed = 0;
	$scope.createAccount = function createAccount(account, user) {
		$scope.accountInProgress = true;
		$scope.accountFailed = 0;
		$scope.mostRecentAccount = 0;

		// console.log('user data', user);
		if(user) {
			account.OwnerId = user.Id;
		}

		// console.log('account data', account);
		api.companies.create(account).then(function(data) {
			$scope.accountInProgress = false;
			$scope.mostRecentAccount = data.id;

			$scope.account = {
				Name: '',
				Website: '',
				Department__c: '',
				OwnerId: '',
				VFA_City__c: ''
			}

			$scope.userSearch = '';
			$scope.citySearch = '';
		}, function(error) {
			$scope.accountInProgress = false;
			$scope.accountFailed = "Sorry, please try again or contact JTD";
		})
	}
})