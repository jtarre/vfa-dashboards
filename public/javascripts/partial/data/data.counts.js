vfaDashboard.controller("dataCountsCtrl", function($scope, api, _) {
	
	$scope.years   = [];
	$scope.cities  = [];
	$scope.schools = [];
	$scope.fellowsTotal = 0;

	 // FOR SORTS //
	 $scope.yearSortProp = 'key';
	 $scope.citySortProp = 'key';
	 $scope.schoolSortProp = 'key';

	 // REVERESES FOR SORT //
	 $scope.yearKeyReverse = true;
	 $scope.cityKeyReverse = true;
	 $scope.schoolKeyReverse = true;

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
	 	$scope.addToArray(schoolsTemp, $scope.schools);
	 	$scope.addToArray(yearsTemp, $scope.years);

	 })

	 /* 

		on each pass, i ned to access the teporary object
		// STEP 1: LOOP THROUGH DATA SET // 
		_.each(data, function(element, index, list){
			
			// STEP 2: AT EACH DATA SET LOOP,
			// INCREMENT COUNT OF APPROPRIATE CATEGORY
			// OF TEMPORARY OBJECT
			// TEMP OBJECTS MAKES IT EASY TO STORE OBJECT DATA
			for(object in arrayOfObjects) {
				// object.tempObject and this is where i need to add to count
				if (element[object.category].indexOf(";")>0) {
					$scope.addFellowInMultipleCitiesToCount(element[object.category], object.tempObject);
				} else {
					$scope.addToCount(element[object.category], object.TempObject);
				}
			}
		});
			// STEP 3: TRANSFORM OBJECTS INTO ARRAY
			// NEED IN ARRAY FORM FOR ANGULAR FILTERING
			for(object in arrayOfObjects) {
				$scope.addToArray(object.tempObject, object.array);
			}

	 	countCategories (data, arrayOfObjects) 
	  */
	
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