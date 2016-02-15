vfaDashboard.controller("homeCtrl", function($scope, $q, _, auth, api, accountsApi) {
	auth.isLoggedIn().then(function(result) {
		if(result) {
			$scope.auth = true;
		} else {
			$scope.auth = false;
		}
	});

	var getRecordsPromise = function getRecords(apiPromise) {
		var deferred = $q.defer();
		apiPromise.then(function(data) {
			console.log('search results: ', data);
			deferred.resolve(data);
		}, function(error) { deferred.reject(error); })
		return deferred.promise;
	}

	var joinRecords = function joinRecords(salesforcePromise1, salesforcePromise2) {
		return $q.all([salesforcePromise1, salesforcePromise2]).then(function(values) {
			console.log('search results: ', values[0], values[1]);
			$scope.records = _.concat(values[0], values[1]);
			console.log('records result: ', $scope.records);
			
		})
	}

	$scope.getRecords = function getRecords(search) {
		joinRecords(getRecordsPromise(api.contacts.getBySearch(search)), getRecordsPromise(accountsApi.getBySearch(search)));
	}

});