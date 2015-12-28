vfaDashboard.controller("SupporterCtrl", function($scope, api) {

	$scope.notes = {};
	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.supporters;
	api.companies.get("development")
		.then( function(data) {
			console.log("company data", data);
			$scope.supporters = data;
		});

	$scope.logNotes = function logNotes(notes) {
		//subject, description, vfaId, objectId, t
		console.log("note data", notes);
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.account.Id)
			.then( function(data) {
				$scope.notes = {};
			})
	}
});