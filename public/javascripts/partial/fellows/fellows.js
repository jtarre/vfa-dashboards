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
				console.log("fellow name", $scope.fellow.profile.Name);
				console.log($scope.fellow);

		});
	};

	$scope.$watch($scope.fellows, function(oldFellowList, newFellowList) {
		console.log(newFellowList);
	});
	
	$scope.logNotes = function(noteData) {
		
		noteData.type = "fellow";
		api.notes.postNotes(noteData).then(function( data ) {
			console.log("Note data received: ", data);
			$scope.noteSubject     = ""; // reset note form values
			$scope.noteDescription = "";
		})
	}
	
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
