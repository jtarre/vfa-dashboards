vfaDashboard.controller("homeCtrl", function($scope, $q, _, auth, api, accountsApi) {
	$scope.isContact = false;
	$scope.isCompany = false;
	$scope.isFellow = false;

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
			// console.log('search results: ', data);
			deferred.resolve(data);
		}, function(error) { deferred.reject(error); })
		return deferred.promise;
	}

	var joinRecords = function joinRecords(salesforcePromise1, salesforcePromise2) {
		return $q.all([salesforcePromise1, salesforcePromise2]).then(function(values) {
			// console.log('search results: ', values[0], values[1]);
			$scope.records = _.concat(values[0], values[1]);
			return $scope.records;
		})
	}

	$scope.getRecords = function getRecords(search) {
		return joinRecords(getRecordsPromise(api.contacts.getBySearch(search)), getRecordsPromise(accountsApi.getBySearch(search)));
	}

	$scope.onSelect = function onSelect ($item, $model, $label, $evt) {
		console.log('item: ', $item);
		// console.log('model: ', $model);
		// console.log('label: ', $label);
		// console.log('event: ', $evt);
		$scope.isContact = false;
		$scope.isCompany = false;
		$scope.isFellow = false;
		if($item.AccountId) {$scope.isContact = true;}
		else if($item.Department__c) {$scope.isCompany = true;}
		else if($item.Department_Type__c === 'Fellow') {$scope.isFellow = true;}
	}

});