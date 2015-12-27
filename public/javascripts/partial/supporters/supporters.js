vfaDashboard.controller("SupporterCtrl", function($scope, api) {

	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.supporters;
	api.companies.get()
		.then( function(data) {
			console.log("company data", data);
			$scope.supporters = data;
		});


});