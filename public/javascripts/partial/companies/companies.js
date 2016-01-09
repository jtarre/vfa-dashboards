vfaDashboard.controller("companiesCtrl", function($scope, slackApi, api) {
	
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
			// console.log("contacts", data);
			$scope.contacts = data;
		});

	api.users.getAll()
		.then( function(data) {
			// console.log("users", data);
			$scope.users = data;
		});
	
	$scope.logNotes = function logNotes(notes) {	
		console.log("notes on submission: ", notes);	
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.contact.Id, notes.relatedTo.Id)
			.then(function( response ) {
				$scope.notes = {};
				$scope.userSearch = "";
				$scope.contactNoteSearch = "";
				$scope.relatedToSearch = "";
			});

		slackApi.create(notes.Subject, notes.Description, notes.user.Name, notes.contact.Name, notes.relatedTo.Name, "#fellow-workflows")
			.then( function(data) {
				console.log("slack response: ", data);
			});
	}
});
