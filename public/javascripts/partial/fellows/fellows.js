vfaDashboard.controller("fellowsCtrl", function($scope, api, _) {
	console.log("initializing Fellow controller");
	
	$scope.count2012 = 0;
	$scope.count2013 = 0;
	$scope.count2014 = 0;
	$scope.count2015 = 0;

	// console.log("fellow value: " + $scope.fellow);
	api.fellows.get().then(function( data ){
		console.log("Data received:");
		// console.log(data);
		$scope.fellows = data;
		console.log($scope.fellows);
	});

	$scope.getFellow = function getFellow(id) {
		console.log("Fellow id: " + id);
		api.fellows.getFellow(id).then(function( data ){
				console.log("Fellow Data received:");
				// console.log(data);
				$scope.fellow = data;
				console.log($scope.fellow);
		});
	};

	// $scope.$watch
	$scope.count = function(classYear) {
		if(!$scope.fellows) {
			return "None";
		} else {
			var count = 0;
			_.each($scope.fellows, function(element,index,list) {
				if(element.year == classYear) {
					count++;
				}
			})
			return count;
		}
	}
});