angular.module('vfaDashboard').controller('NoteLoggerCtrl', function($scope, api) {
	
	$scope.inProgress = false;
	$scope.loggedNotes = [];

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