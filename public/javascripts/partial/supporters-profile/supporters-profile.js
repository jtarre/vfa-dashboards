vfaDashboard.controller("SupporterProfileCtrl", function($scope, $stateParams, _, api) {

	$scope.relatedToList = [];
	$scope.supporterId = $stateParams.supporterId;
	$scope.contacts;
	$scope.supporterInfo;
	$scope.notes = {};

	api.companies.getCompany($scope.supporterId)
		.then( function(data) {
			$scope.supporterInfo = data;
			console.log("company info", data);
			$scope.relatedToList.push( {name: data.Name, id: data.Id} );
		});

	api.companies.getContacts($scope.supporterId)
		.then( function(data) {
			$scope.contacts = data;
			console.log("contact list", $scope.contacts);
			// _.forEach($scope.contacts, function(value, index) {
			// 	// console.log("contact value and index", value, index);
			// 	$scope.totalList.push({ name: value.Name, id: value.Id });
			// });
			// console.log("total list after contacts", $scope.totalList);
		});

	$scope.users;
	api.users.getAll()
		.then( function(data) {
			$scope.users = data;
		});

	$scope.opportunities;
	api.opportunities.getForCompany($scope.supporterId)
		.then( function(data) {
			$scope.opportunities = data;
			console.log("opportunity data", data);
			console.log("total list before opps", $scope.relatedToList);
			_.forEach($scope.opportunities, function(value, index) {
				// console.log("opportunity value and index", value, index);
				$scope.relatedToList.push({ name: value.Name, id: value.Id });
			});
			console.log("total list after opps\n", $scope.relatedToList);
		});

	$scope.logNotes = function logNotes(notes) {
		api.notes.post(notes.Subject, notes.Description, notes.user.Id, notes.contact.Id, "fellow", notes.relatedTo.Id);
	}
});