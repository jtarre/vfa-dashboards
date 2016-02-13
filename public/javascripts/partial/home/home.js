vfaDashboard.controller("homeCtrl", function($scope, auth, api, accountsApi) {
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

	

});