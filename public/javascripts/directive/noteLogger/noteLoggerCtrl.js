angular.module('vfaDashboard').controller('NoteLoggerCtrl', function($scope, accountsApi, api) {
	
	$scope.inProgress = false;
	$scope.loggedNotes = [];

	api.users.getAll().then(function(users) {
		$scope.users = users;
	})

	$scope.contacts = [];
	$scope.contactSearch = "";
	$scope.contactSfSearch = false;
	$scope.isContactSearch = false;
	$scope.$watch('contactSearch', function(newValue) {
		console.log("new value = value & length:", newValue, newValue.length)
		if(newValue.length > 5) {
			if(!$scope.contactSfSearch) {
				$scope.contactSfSearch = true;
				console.log("new value = 5");
				$scope.isContactSearch = true;
				api.contacts.getBySearch(newValue).then(function(data) {
					console.log("note logger ctrl response: ", data);
					$scope.isContactSearch = false;
					$scope.contacts = data;
				});
			}
		}

		if(newValue.length <= 5) { // reset if person deletes name
			if($scope.contactSfSearch) {
				$scope.contactSfSearch = false;
			}
		}
	});

	$scope.relatedTo = [];
	$scope.relatedToSearch = "";
	$scope.relatedToSfSearch = false;
	$scope.isRelatedToSearch = false;
	$scope.$watch('relatedToSearch', function(newValue) {
		console.log("new value = value & length:", newValue, newValue.length)
		if(newValue.length > 4) {
			if(!$scope.relatedToSfSearch) {
				$scope.relatedToSfSearch = true;
				console.log("new value = 5");
				$scope.isRelatedToSearch = true;
				accountsApi.getBySearch(newValue).then(function(data) {
					console.log("note logger ctrl response: ", data);
					$scope.isRelatedToSearch = false;
					$scope.relatedTo = data;
				});
			}
		}

		if(newValue.length <= 4) { // reset if person deletes name
			if($scope.relatedToSfSearch) {
				$scope.relatedToSfSearch = false;
			}
		}
	});

	$scope.logNotes = function logNotes(notes) {
		console.log("note logger logging note.");
		$scope.inProgress = true;
		var subject = "";
		var description = "";
		var vfaId = "";
		var contactId = "";
		var relatedToId = "";

		if(notes.Subject) {
			subject = notes.Subject;
		}

		if(notes.Description) {
			description = notes.Description;
		}

		if(notes.user) {
			vfaId = notes.user.Id;
		}

		if(notes.contact) {
			contactId = notes.contact.Id;
		}

		if(notes.relatedTo) {
			relatedToId = notes.relatedTo.Id;
		}

		api.notes.post(subject, description, vfaId, contactId, relatedToId).then(function(data) {
			$scope.inProgress = false;
			$scope.loggedNotes.push(data.id);
		}, function(error) {
			$scope.inProgress = false;
			console.error("error: ", error);
		});		
	}
});