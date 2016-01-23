angular.module('vfaDashboard').controller('CaseCtrl', function($scope, _, api, casesApi) {
	api.users.getAll().then(function(data) {
		$scope.users = data;
	});

	$scope.createCase = function createCase(newCase) {
		newCase = _.map(newCase, function(newCaseInput) {
						if(_.isNull(newCaseInput)) {
							newCaseInput = "";
						}
					});
		// let's think about this in the lodash way. 
		// i want to check if each input is null
		// and make them "" for the ones that are
		// and do nothing for the ones that aren't. 

		casesApi.create(newCase.Subject, newCase.Description, newCase.user, newCase.contact, newCase.type);
	}
})