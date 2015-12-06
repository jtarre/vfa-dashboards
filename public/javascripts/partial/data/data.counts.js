vfaDashboard.controller("dataCountsCtrl", function($scope, api, _) {
	/*
		Eventually, I'm going to grab all 3 categories of data. 
		starting with Fellows, the first thing I'll do is api.getFellows
		then organize them into counts / categories
		this is something that I can speed up over time. 
		Might want to look into graphql when the time comes. 
		seemse like the type of thing it's made for. so i don't have to have a specific
		api for each special use case
	 */
	 $scope.years   = {};
	 $scope.cities  = {};
	 $scope.schools = {};
	 $scope.fellowsTotal = 0;
	 
	 api.fellows.get().then( function (data) {
	 	$scope.fellowData = data;
	 	console.log("fellow data", $scope.fellowData);

	 	var placeholderForMultipleCities = [];

	 	_.each($scope.fellowData, function(element, index, list) {
	 		$scope.fellowsTotal = $scope.fellowsTotal + 1;


	 		// by year
	 		console.log(element.year);
	 		if(element.year !== undefined && element.year !== null) {
		 		if($scope.years.hasOwnProperty(element.year)) {
		 			$scope.years[element.year] = $scope.years[element.year] + 1;
		 		} else {
		 			$scope.years[element.year] = 1;
		 		}	
	 		}
	 		

	 		// by city
	 		console.log("City", element.city);
	 		if(element.city !== undefined && element.city !== null) {
	 			if(element.city.indexOf(";")>0) {
	 				// associated with multiple cities 
	 				// function to split values
	 				// placeholderForMultipleCities = element.city.split(";");
	 				console.log("multiple cities", element.city.split(";"));
	 				addFellowInMultipleCitiesToCount(element.city.split(";"));
	 			} else {
	 				if($scope.cities.hasOwnProperty(element.city)) {
			 			$scope.cities[element.city] = $scope.cities[element.city] + 1; 
			 		} else {
			 			$scope.cities[element.city] = 1;
			 		}
	 			}
	 		}
		 		

	 		// by school
	 		console.log("alma mater", element.almaMater);
	 		if(element.almaMater !== undefined && element.almaMater !== null) {
	 			console.log("type of alma mater", typeof element.almaMater);
	 			
		 		if($scope.schools.hasOwnProperty(element.almaMater)) {
		 			$scope.schools[element.almaMater] = $scope.schools[element.almaMater] + 1; 
		 		} else {
		 			$scope.schools[element.almaMater] = 1;
		 		}	
	 		}
	 		
	 	});

	 })

	var addFellowInMultipleCitiesToCount = function addFellowInMultipleCitiesToCount(array) {
		_.each(array, function(element, index, list) {
			if($scope.cities.hasOwnProperty(element)) {
			 	$scope.cities[element] = $scope.cities[element] + 1; 
			 } else {
			 	$scope.cities[element] = 1;
			}
		});
	}
	
})