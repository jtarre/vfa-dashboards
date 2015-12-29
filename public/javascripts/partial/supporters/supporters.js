vfaDashboard.controller("SupporterCtrl", function($scope, supportersApi, api) {

	$scope.notes = {};
	$scope.relatedTo = [];
	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.supporters;
	supportersApi.getAll()
		.then( function(data) {
			$scope.supporters = data;
			_.forEach($scope.supporters, function(value, index) {
				$scope.relatedTo.push({name: value.Name, id: value.Id});
			});
		});

	supportersApi.getContactsForAll()
		.then( function(data) {
			// console.log("contact data", data);
			$scope.contacts = data;
		});

	supportersApi.getOpportunitiesForAll()
		.then( function(data) {
			// console.log("opportunities data", data);
			$scope.opportunities = data;
			_.forEach($scope.opportunities, function(value, index) {
				$scope.relatedTo.push({name: value.Name, id: value.Id});
			});
		});

	$scope.logNotes = function logNotes(notes) {
		//subject, description, vfaId, objectId, t
		// console.log("note data", notes);
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.contact.Id, notes.relatedTo.id)
			.then( function(data) {
				$scope.notes = {};
				$scope.relatedToSearch = "";
				$scope.contactNoteSearch = "";
				$scope.userSearch = "";
			});
	}
});