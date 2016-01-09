vfaDashboard.controller("SupporterCtrl", function($scope, supportersApi, slackApi, api) {

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
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.contact.Id, notes.relatedTo.id)
			.then( function(data) {
				$scope.notes = {};
				$scope.relatedToSearch = "";
				$scope.contactNoteSearch = "";
				$scope.userSearch = "";
			});
			
		slackApi.create(notes.Subject, notes.Description, notes.user.Name, notes.contact.Name, notes.relatedTo.name, "#team-money-notes")
			.then( function(data) {
				console.log("slack response: ", data);
			});
	}
});