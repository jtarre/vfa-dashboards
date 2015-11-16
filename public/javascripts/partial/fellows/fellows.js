vfaDashboard.controller("fellowsCtrl", function($scope, api, _) {
	console.log("initializing Fellow controller");
	
	$scope.fellows;
	$scope.sortProp = "name";
	$scope.reverse  = true;

	$scope.classYears = 
	{
		"2012" : {"year": "2012", "count": 0},
		"2013" : {"year": "2013", "count": 0},
		"2014" : {"year": "2014", "count": 0},
		"2015" : {"year": "2015", "count": 0},
		"2016" : {"year": "2016", "count": 0}
	}

	// $scope.count2012 = 0;
	// $scope.count2013 = 0;
	// $scope.count2014 = 0;
	// $scope.count2015 = 0;
	// $scope.total     = $scope.count2012 + $scope.count2013 + $scope.count2014 + $scope.count2015 + $scope.count2016;

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

	// ok, how do i want to do this 
	// this is a coding puzzle
	// I want to keep track of the count
	// why can't it be, getCount
	// hmm something as simple as counting can't be done automagically
	/*
		getCount = classYear {
			get the list of Fellows 
		}
		that's what I already did, but I need it
		to recalculate each time the fellows list
		changes via search
		maybe the list isn't actually changing
		what's actually going on here
		when I filter, is the underlying list actually changes
	 */

	$scope.$watch($scope.fellows, function(oldFellowList, newFellowList) {
		console.log(newFellowList);
	});

	$scope.count = function(classYear, list) {
		if(!list) {
			return "None";
		} else {
			var count = 0;
			_.each(list, function(element,index,list) {
				if(element.year == classYear) {
					count++;
				}
			})
			return count;
		}
	}
});