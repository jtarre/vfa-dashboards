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
	
	$scope.vfaTeam = 
	[	
		{ name: "", id : ""},
		{ name: "Amy Nelson", id : "005d0000001QfTE"},	
		{ name: "Andrew Yang", id : "005d0000001OKLG"},	
		{ name: "Barrie Grinberg", id : "005d0000003h7Sp"},	
		{ name: "Caroline Toch", id : "005d0000004fYCj"},	
		{ name: "Cathlin Olszewski", id : "005d00000031mtf"},	
		{ name: "Connor Schake", id : "005d0000004czLN"},	
		{ name: "Eileen Lee", id : "005d0000001OKLf"},	
		{ name: "Elisabeth Deogracias", id : "005d0000001Nsrm"},	
		{ name: "Hannah Steinhardt", id : "005d0000004czLI"},	
		{ name: "Helen Lynch", id : "005d0000004q79a"},	
		{ name: "Isa Ballard", id : "005d00000031mtk"},	
		{ name: "Jackie Miller", id : "005d0000001O6g0"},	
		{ name: "Jason Tarre", id : "005d0000001OzTa"},	
		{ name: "Joe Guy", id : "005d0000002h82C"},	
		{ name: "Katie Bloom", id : "005d00000048Li7"},	
		{ name: "Laila Selim", id : "005d00000033SpB"},	
		{ name: "Lauren Gill", id : "005d0000001OKMY"},	
		{ name: "Leandra Elberger", id : "005d0000002hE6F"},	
		{ name: "Mandy Marcus", id : "005d0000004e7gk"},	
		{ name: "Megan Hurlburt", id : "005d0000001OKMT"},	
		{ name: "Mike Tarullo", id : "005d0000001OKLz"},	
		{ name: "Mike Henrich", id : "005d0000004KHDY"},	
		{ name: "Rachel Greenspan", id : "005d0000004HrpD"},	
		{ name: "Seonhye Moon", id : "005d0000001OKMd"},	
		{ name: "Tom Griffin", id : "005d00000045mKQ"},	
		{ name: "Victor Bartash", id : "005d0000004KHDd"},	
		{ name: "Will Geary", id : "005d00000048iYF"}
	]
});
