vfaDashboard.controller("homeCtrl", function($scope, auth) {
	auth.isLoggedIn().then(function(result) {
		if(result) {
			$scope.auth = true;
		} else {
			$scope.auth = false;
		}
	});

	$scope.contacts = [
		{Name: "Jason", Id: "1"},
		{Name: "Holly", Id: "2"}
	];
	console.log("contacts:", $scope.contacts);
	$scope.relatedTo = [
		{Name: "Jason", Id: "1"},
		{Name: "Holly", Id: "2"}
	];

	$scope.user = [
		{Name: "Jason", Id: "1"},
		{Name: "Holly", Id: "2"}
	]

});