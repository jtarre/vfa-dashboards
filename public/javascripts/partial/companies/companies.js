vfaDashboard.controller("companiesCtrl", function($scope, api) {
	
	$scope.companies;
	$scope.salesforceFields;
	$scope.company;
	$scope.users;
	$scope.notes = {};

	api.companies.get("company-partnerships")
		.then(function(data) {
			$scope.companies = data;
		});

	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		})

	// api.companies.getFields()
	// 	.then(function(data) {
	// 		$scope.salesforceFields = data;
	// 	});

	$scope.getCompany = function getCompany(id) {
		api.getCompany(id)
			.then(function(response) {
				$scope.company = response;
			});
	}
	
	$scope.logNotes = function logNotes(notes) {		
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.account.Id, "company")
			.then(function( response ) {
				$scope.notes = {};
			});
	}
});
