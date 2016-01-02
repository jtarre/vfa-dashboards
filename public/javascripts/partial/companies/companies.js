vfaDashboard.controller("companiesCtrl", function($scope, api) {
	
	$scope.companies;
	$scope.users;
	$scope.contacts;
	$scope.notes = {};

	api.companies.get("company-partnerships")
		.then(function(data) {
			$scope.companies = data;
		});

	api.companies.getContactsForAll()
		.then( function(data) {
			console.log("contacts", data);
			$scope.contacts = data;
		});

	api.users.getAll()
		.then( function(data) {
			console.log("users", data);
			$scope.users = data;
		});
	
	$scope.logNotes = function logNotes(subject, description, userId, contactId, relatedToId) {		
		api.notes.post(subject, description, userId, contactId, relatedToId)
			.then(function( response ) {
				$scope.notes = {};
				$scope.userSearch = "";
				$scope.contactNoteSearch = "";
				$scope.relatedToSearch = "";
			});
	}
});
