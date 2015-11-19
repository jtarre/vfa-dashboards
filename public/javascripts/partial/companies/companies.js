vfaDashboard.controller("companiesCtrl", function($scope, api) {
	
	$scope.companies;
	$scope.company;

	api.companies.get().then(function(data) {
		$scope.companies = data;
	})

	$scope.getCompany = function getCompany(id) {
		api.getCompany(id).then(function(response) {
			$scope.company = response;
		})
	}
});