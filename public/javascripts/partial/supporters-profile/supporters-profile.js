vfaDashboard.controller("SupporterProfileCtrl", function($scope, $stateParams, _, api) {

	$scope.totalList = [];
	$scope.supporterId = $stateParams.supporterId;
	$scope.contacts;
	api.companies.getContacts($scope.supporterId)
		.then( function(data) {
			$scope.contacts = data;
			console.log("total list before contacts", $scope.totalList);
			_.forEach($scope.contacts, function(value, index) {
				// console.log("contact value and index", value, index);
				$scope.totalList.push({ name: value.Name, id: value.Id });
			});
			console.log("total list after contacts", $scope.totalList);
		});

	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.opportunities;
	api.opportunities.getForCompany($scope.supporterId)
		.then( function(data) {
			$scope.opportunities = data;
			console.log("total list before opps", $scope.totalList);
			_.forEach($scope.opportunities, function(value, index) {
				// console.log("opportunity value and index", value, index);
				$scope.totalList.push({ name: value.Name, id: value.Id });
			});
			console.log("total list after opps\n", $scope.totalList);
		});
});