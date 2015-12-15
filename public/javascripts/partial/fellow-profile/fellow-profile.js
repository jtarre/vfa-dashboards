vfaDashboard.controller("fellowCtrl", function($scope, $stateParams, api) {

	$scope.fellow;
	$scope.fellowId = $stateParams.fellowId;
	// $scope.cases;

	api.fellows.getFellow($scope.fellowId).then(function( data ){
		console.log("Fellow Data received:");
		console.log(data);
		$scope.fellow = data;
		// console.log("fellow name", $scope.fellow.profile.Name);
		$scope.cases = $scope.fellow.cases;
		console.log("cases in fellow scope: ",$scope.fellow.cases);
		// console.log($scope.fellow);

	});

	$scope.logNotes = function logNotes(noteSubject, noteDescription, vfaId, fellowId, caseId) {
		api.notes.post(noteSubject, noteDescription, vfaId, fellowId, "fellow", caseId).then(function( data ) {
			console.log("Note data received: ", data);
			$scope.noteSubject     = ""; // reset note form values
			$scope.noteDescription = "";
		});
	}

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

/*
					<button ng-click="edit = !edit">{{edit ? 'Show' : 'Edit'}}</button>
				<h3 id="fellowInfo">Fellow Info</h3>
				<div class="fellow-info-content row">
					<div ng-repeat="fellow fellow.profile">

						<div class="detail-label" ng-hide="edit">
							<span>{{key | fellowTitle}}</span>
							<span ng-hide="edit">{{value}}</span>
							<select ng-if="isSelect(key)" ng-show="edit" class="detail-select" ng-options="fellows">
							</select>
							<input ng-if="isText(key)" ng-show="edit" ng-model="fellow.profile[key]" />
						</div>
 */

