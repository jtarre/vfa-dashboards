vfaDashboard.controller("SupporterCtrl", function($scope, api) {

	$scope.test = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

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