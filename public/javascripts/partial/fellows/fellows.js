vfaDashboard.controller("fellowsCtrl", function($scope, api, _) {
	console.log("initializing Fellow controller");
	
	/*
		what's my hang up?
		I'm trying to figure out routing, 
		but can't seem to nail it. 
		how to do it. 
		can't seem to "grok" angular ui-router. 
		or angular for that matter. 
		what's the underlying structure. 
		what's the language. how to 
		think in angular. 

		my focus is in the wrong place. 
		i need to get the job done. 
		i'm scared. i'm doing it wrong. 
		there is no "wrong". there's what works. 
		And what's maintainable.

		so that's how controllers work. they get "initialized"
		each time they're called. 

		if i don't want to reinitialize, i have to use child. 
		let's try that. 

		a browse ui-sref and a profile ui-sref
		so i have to rewrite some header code. big fucking deal. 
	 */

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
	
	$scope.logNotes = function(noteSubject, noteDescription, vfaId, fellowId) {
		console.log("Let's log notes!")
		console.log(noteSubject + "\n" + noteDescription + "\n" + vfaId + "\n" + fellowId);
		var noteData = 
		{
			noteDescription: noteDescription,
			noteSubject:     noteSubject,
			vfaId:           vfaId, 
			fellowId:        fellowId,
			type:            "fellow"
		}
		
		api.notes.post(noteData).then(function( data ) {
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
