vfaDashboard.controller("cityMapCtrl", function($scope, $http, 'leafletData') {
	
	$scope.markers;
	$scope.cityCenter;
	
	$scope.getCityData = function(cityAndState) {
		api.cities.getCityData(cityAndState).then(function( response ) {
			$scope.cityData = response.markers;
			$scope.markers = cityDataToCityMarkers($scope.cityData);
			$scope.cityCenter = response.cityCenter;
		})
	}
	
	$scope.cityDataToCityMarkers = function(cityData) {
		
	}
})
