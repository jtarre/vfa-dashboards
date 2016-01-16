vfaDashboard.controller("SupporterCtrl", function($scope, supportersApi, api, errorMessage) {

	$scope.notes = {};
	$scope.relatedTo = [];
	$scope.users;
	$scope.errorMessage;

	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		}, function(error) { console.log(error); });

	$scope.supporters;
	supportersApi.getAll()
		.then( function(data) {
			$scope.supporters = data;
			_.forEach($scope.supporters, function(value, index) {
				$scope.relatedTo.push({name: value.Name, id: value.Id});
			});
		}, function(error) { console.log(error); });

	// supportersApi.getContactsForAll()
	// 	.then( function(data) {
	// 		// console.log("contact data", data);
	// 		$scope.contacts = data;
	// 	}, function(error) { console.log(error); });

	// supportersApi.getOpportunitiesForAll()
	// 	.then( function(data) {
	// 		// console.log("opportunities data", data);
	// 		$scope.opportunities = data;
	// 		_.forEach($scope.opportunities, function(value, index) {
	// 			$scope.relatedTo.push({name: value.Name, id: value.Id});
	// 		});
	// 	}, function(error) { console.log(error); });

	$scope.logNotes = function logNotes(notes) {
		//subject, description, vfaId, objectId, t
		// console.log("note data", notes);
		api.notes.post(notes)
			.then( function(data) {
				$scope.notes = {};
				$scope.relatedToSearch = "";
				$scope.contactNoteSearch = "";
				$scope.userSearch = "";
			}, function(error) { console.log(error); });
	}

	$scope.setErrorMessage = function setErrorMessage (error) {
		$scope.errorMessage = errorMessage.standard;
	}
});