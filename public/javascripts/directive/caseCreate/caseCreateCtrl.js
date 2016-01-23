angular.module('vfaDashboard').controller('CaseCtrl', function($scope, _, api, casesApi) {
	api.users.getAll().then(function(data) {
		$scope.users = data;
	});

	$scope.createCase = function createCase(newCase) {
		casesApi.create(subject);
	}
})