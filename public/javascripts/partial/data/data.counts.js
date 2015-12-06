vfaDashboard.controller("dataCountsCtrl", function($scope, api, _) {
	
	$scope.years   = [];
	$scope.cities  = [];
	$scope.schools = [];
	$scope.fellowsTotal = 0;

	 // FOR SORTS //
	 // $scope.sortProp = city;
	 

	 api.fellows.get().then( function (data) {
	 	$scope.fellowData = data;
	 	var citiesTemp = {};
	 	var yearsTemp  = {};
	 	var schoolsTemp = {};

	 	_.each($scope.fellowData, function(element, index, list) {
	 		$scope.fellowsTotal = $scope.fellowsTotal + 1;

	 		// by year
	 		$scope.addToCount(element.year, yearsTemp);
	 		

	 		// by city
	 		// console.log("City", element.city);
	 		if(element.city !== undefined && element.city !== null) {
	 			if(element.city.indexOf(";")>0) {
	 				console.log("multiple cities", element.city.split(";"));
	 				$scope.addFellowInMultipleCitiesToCount(element.city.split(";"), citiesTemp);
	 			} else {
	 				$scope.addToCount(element.city, citiesTemp);
	 			}
 			}

	 		// by school
	 		$scope.addToCount(element.almaMater, schoolsTemp);
	 	});

	 	$scope.addToArray(citiesTemp, $scope.cities);
	 	console.log("cities scope", $scope.cities);
	 	$scope.addToArray(schoolsTemp, $scope.schools);
	 	console.log("schools scope", $scope.schools);
	 	$scope.addToArray(yearsTemp, $scope.years);

	 })
	
	$scope.addToCount = function addToCount(element, objectOfObjects) {
		// console.log("element in add to count", element);
		if(element !== undefined && element !== null) {
			if(objectOfObjects.hasOwnProperty(element)) {
				objectOfObjects[element] = objectOfObjects[element] + 1;
			} else {
				objectOfObjects[element] = 1;
			}
		}
	}

	$scope.addToArray = function addToArray(objectOfObjects, array) {
		_.each(objectOfObjects, function(value, key, list) {
			// console.log("value in objectOfObjects", value);
			// console.log("key in objectOfObjects", key);
			array.push({key: key, value: value});
		})
	}

	$scope.addFellowInMultipleCitiesToCount = function addFellowInMultipleCitiesToCount(array, objectOfObjects) {
		_.each(array, function(element, index, list) {
			if(objectOfObjects.hasOwnProperty(element)) {
			 	objectOfObjects[element] = objectOfObjects[element] + 1; 
			 } else {
			 	objectOfObjects[element] = 1;
			}
		});
	}
	
})