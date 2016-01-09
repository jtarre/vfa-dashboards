vfaDashboard.controller("fellowCtrl", function($scope, $stateParams, slackApi, api) {

	$scope.fellow;
	$scope.fellowId = $stateParams.fellowId;
	$scope.cases;

	$scope.isLogNotes = true;
	$scope.isCreateCase = false;

	api.fellows.getFellow($scope.fellowId).then(function( data ){		
		$scope.fellow = data;
		$scope.cases = $scope.fellow.cases;

	});

	// need to refactor the Fellow page to break into separate calls

	//Get Fellow data

	casesApi.getForFellow($scope.fellowId) // done?
		.then(function(data) {
			$scope.casesNew = data;
		});

	surveysApi.getForFellow($scope.fellowId, "company")
		.then(function(data) {
			$scope.surveysNew = data;
		});

	surveysApi.getForFellow($scope.fellowId, "fellow")
		.then(function(data) {
			$scope.surveysNew = data;
		});

	activitiesApi.getForFellow($scope.fellowId)
		.then(function(data) {
			$scope.activitiesNew = data;
		})

	$scope.logNotes = function logNotes(noteSubject, noteDescription, vfa, fellow, activeCase) {
		api.notes.post(noteSubject, noteDescription, vfa.id, fellow.profile.Id, activeCase.Id).then(function( data ) {
			console.log("Note data received: ", data);
			$scope.noteSubject     = ""; // reset note form values
			$scope.noteDescription = "";
		});

		slackApi.create(noteSubject, noteDescription, vfa.name, fellow.profile.Name, activeCase.Subject, "#fellow-workflows")
			.then( function(data) {
				console.log("slack response: ", data);
			});
	}

	$scope.createCase = function createCase(subject, description, user, fellow) {
		casesApi.create(subject, description, user, fellow)
			.then( function (data) {
				// add the link to the case as a toast
				console.log("case response: ", data);
			})
	}


		/*
		code pen, engaged.
		now what i want
		caseApi
		/api/case - post
		$scope.createCase = function createCase
		been here before...
	 */
	// 
	$scope.vfaTeam = [	
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
})

