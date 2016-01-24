angular.module('vfaDashboard').controller('ContactCtrl', function($scope, _, api) {

	api.contacts.getCities().then(function(data) {
		$scope.cities = data;
	})
})