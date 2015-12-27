vfaDashboard.controller("SupporterCtrl", function($scope, $stateParams, api) {

	$scope.supporterId = $stateParams.supporterId;
	$scope.contacts;
	api.contacts.getContacts(supporterId)
		.then( function(data) {
			$scope.contacts = data;
		});

	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.opportunities;
	api.opportunities.getForCompany(supporterId)
		.then( function(data) {
			$scope.opportunities = data;
		});
});