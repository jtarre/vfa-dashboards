angular.module('vfaDashboard').controller('CaseCtrl', function($scope, api, casesApi) {
	api.users.getAll().then(function(data) {
		$scope.users = data;
	});

	$scope.createCase = function createCase() {
		caseApi.create(subject);
	}
})