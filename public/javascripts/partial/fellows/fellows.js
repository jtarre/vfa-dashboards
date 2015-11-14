vfaDashboard.controller("fellowsCtrl", function($scope, api) {
	console.log("initializing Fellow controller");
	api.fellows.get().then(function( data ){
		console.log("Data received:");
		// console.log(data);
		$scope.fellows = data;
		console.log($scope.fellows);
	});
});