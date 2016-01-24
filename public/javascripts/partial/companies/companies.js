vfaDashboard.controller("companiesCtrl", function($scope, slackApi, accountsApi, api) {
	
	$scope.users;
	$scope.contacts;
	$scope.notes = {};

	console.log($scope.loggedin);

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

	$scope.accounts = [];
	$scope.searchQuery = "";
	$scope.searchInProgress = false;
	$scope.noAccountsFound = false;
	$scope.noAccountsFoundMessage = "No Accounts Found. Search Again";
	$scope.$watch('searchQuery', function(newValue) {
		// console.log("new value = value & length:", newValue, newValue.length);
		if(newValue.length >= 4) {
			if(!$scope.searchInProgress) {
				$scope.searchAccounts(newValue);
			}
		}

		if(newValue.length < 4) { // reset if person deletes name
			if($scope.searchInProgress) {
				$scope.searchInProgress = false;
			}
		}
	});

	$scope.searchAccounts = function searchAccounts(search) {
		$scope.searchInProgress = true;
		$scope.accounts = [];
		$scope.noAccountsFound = false;
		
		accountsApi.getBySearch(search).then(function(data) {
			console.log("search response: ", data);
			$scope.searchInProgress = false;
			if(data.length) {
				$scope.accounts = data;	
			} else {
				$scope.noAccountsFound = "No Accounts Found. Search Again";
			}
		}, function(error) {
			$scope.noAccountsFound = "Sorry, please try again or contact JTD";
			console.error(error);
		});
	}
	
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
