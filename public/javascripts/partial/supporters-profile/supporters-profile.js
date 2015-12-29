vfaDashboard.controller("SupporterProfileCtrl", function($scope, $stateParams, _, supportersApi, api) {

	$scope.relatedToList = [];
	$scope.supporterId = $stateParams.supporterId;
	$scope.contacts;
	$scope.opportunities;
	$scope.activities;
	$scope.users;
	$scope.supporterInfo;
	$scope.notes = {};

	supportersApi.getOne($scope.supporterId)
		.then( function(data) {
			$scope.supporterInfo = data;
			console.log("company info", data);
			$scope.relatedToList.push( {name: data.Name, id: data.Id} );
		});

	supportersApi.getContacts($scope.supporterId)
		.then( function(data) {
			$scope.contacts = data;
			console.log("contact list", $scope.contacts);
		});
	
	supportersApi.getOpportunities($scope.supporterId)
		.then( function(data) {
			$scope.opportunities = data;
			// console.log("opportunity data", data);
			console.log("total list before opps", $scope.relatedToList);
			_.forEach($scope.opportunities, function(value, index) {
				// console.log("opportunity value and index", value, index);
				$scope.relatedToList.push({ name: value.Name, id: value.Id });
			});
			// console.log("total list after opps\n", $scope.relatedToList);
		});

	supportersApi.getActivities($scope.supporterId)
		.then( function(data) {
			$scope.activities = data;
			console.log("company activities", $scope.activities);
		});

	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.getUser = function getUser(userList, id) {
	    var user = {};
	    _.each(userList, function(value, index) {
	    	if(value.Id === id) {
	    		// console.log("ids:", value.Id, id);
	    		user = value;
	    		return user;
	    	}
	    });
	    return user;
	}

	$scope.logNotes = function logNotes(notes) {
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.contact.Id, notes.relatedTo.id)
			.then(function(data) {
				$scope.notes = {};
				$scope.userSearch = "";
				$scope.contactSearch = "";
				$scope.relatedToSearch = "";
			});
	}
});