vfaDashboard.controller("fellowsCtrl", function($scope, api) {
	console.log("initializing Fellow controller");
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
});