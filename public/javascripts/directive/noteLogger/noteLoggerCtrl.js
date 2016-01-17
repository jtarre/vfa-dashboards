angular.module('vfaDashboard').controller('NoteLoggerCtrl', function($scope, accountsApi, slackApi, api, _) {
	
	$scope.inProgress = false;
	$scope.loggedNotes = [];
	$scope.slackChannels = {
		"copa": {name: "#test-private", active: false},
		"fellows": {name: "#test-private", active: false},
		"money": {name: "#test-private", active: false}
	};
	/*
		ng-model="slackChannels.copa"
		slackChannels.fellows
		slackChannels.money
	 */

	api.users.getAll().then(function(users) {
		$scope.users = users;
	})

	$scope.contacts = [];
	$scope.contactSearch = "";
	$scope.contactSfSearch = false;
	$scope.isContactSearchInProgress = false;
	$scope.noContactsFound = false;
	$scope.noContactsFoundMessage = "No Contacts Found. Search Again";
	$scope.$watch('contactSearch', function(newValue) {
		// console.log("new value = value & length:", newValue, newValue.length);
		if(newValue.length > 5) {
			if(!$scope.contactSfSearch) {
				$scope.searchContacts(newValue);
			}
		}

		if(newValue.length <= 5) { // reset if person deletes name
			if($scope.contactSfSearch) {
				$scope.contactSfSearch = false;
			}
		}
	});

	$scope.searchContacts = function searchContacts(search) {
		$scope.contactSfSearch = true;
			$scope.isContactSearchInProgress = true;
			$scope.noContactsFound = false;
			$scope.contacts = [];
			api.contacts.getBySearch(search).then(function(data) {
				console.log("note logger ctrl response: ", data);
				$scope.isContactSearchInProgress = false;
				if(data.length) {
					$scope.contacts = data;	
				} else {
					$scope.noContactsFound = true;
				}
				
			});
	}

	$scope.relatedTo = [];
	$scope.relatedToSearch = "";
	$scope.relatedToSfSearch = false;
	$scope.isRelatedToSearchInProgress = false;
	$scope.noCompaniesFound = false;
	$scope.noCompaniesFoundMessage = "No Accounts Found. Search Again";
	$scope.$watch('relatedToSearch', function(newValue) {
		// console.log("new value = value & length:", newValue, newValue.length);
		if(newValue.length > 4) {
			if(!$scope.relatedToSfSearch) {
				$scope.searchAccounts(newValue);
			}
		}

		if(newValue.length <= 4) { // reset if person deletes name
			if($scope.relatedToSfSearch) {
				$scope.relatedToSfSearch = false;
			}
		}
	});

	$scope.searchAccounts = function searchAccounts(search) {
		$scope.relatedToSfSearch = true;
		$scope.isRelatedToSearchInProgress = true;
		$scope.relatedTo = [];
		$scope.noCompaniesFound = false;
		accountsApi.getBySearch(search).then(function(data) {
			console.log("note logger ctrl response: ", data);
			$scope.isRelatedToSearchInProgress = false;
			if(data.length) {
				$scope.relatedTo = data;	
			} else {
				$scope.noCompaniesFound = true;
			}
		});
	}

	$scope.logNotes = function logNotes(notes) {
		console.log("note logger logging note.");
		$scope.inProgress = true;
		var subject = "";
		var description = "";
		
		var vfaId = "";
		var vfaName = "";
		
		var contactId = "";
		var contactName = "";

		var relatedToId = "";
		var relatedToName = "";

		if(notes.Subject) {
			subject = notes.Subject;
		}

		if(notes.Description) {
			description = notes.Description;
		}

		if(notes.user) {
			vfaId = notes.user.Id;
			vfaName = notes.user.Name;
		}

		if(notes.contact) {
			contactId = notes.contact.Id;
			contactName = notes.contact.Name;
		}

		if(notes.relatedTo) {
			relatedToId = notes.relatedTo.Id;
			relatedToName = notes.relatedTo.Name;
		}

		api.notes.post(subject, description, vfaId, contactId, relatedToId).then(function(data) {
			$scope.inProgress = false;
			$scope.loggedNotes.push(data.id);
		}, function(error) {
			$scope.inProgress = false;
			console.error("error: ", error);
		});
		
		_.forEach($scope.slackChannels, function(value, key) {
			console.log("key:", key);
			console.log("value:", value);
			if(value.active) {
				slackApi.create(subject, description, vfaName, contactName, relatedToName, value.name)
				.then( function(data) {
					console.log("slack response for channel: ", value, data);
				});				
			}
			
		});
		
	}
});