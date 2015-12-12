vfaDashboard.controller("companyCtrl", function($scope, api, _) {
	api.companies.getFields().then(function(response) {
		// console.log("salesforce data fields", data);
		$scope.salesforceFields = response.fields;
		// console.log("salesforce fields", $scope.salesforceFields);
	});

	api.companies.get(id).then(function(data) {
		$scope.salesforceData = data;
	});


})