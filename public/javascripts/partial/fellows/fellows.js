vfaDashboard.controller("fellowsCtrl", function($scope, api) {
	api.fellows.get().then(function( data ){
		$scope.fellows = data;
	});
});