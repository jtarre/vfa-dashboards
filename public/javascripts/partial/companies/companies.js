vfaDashboard.controller("companiesCtrl", function($scope, api) {
	
	$scope.companies;
	$scope.company;

	api.companies.get().then(function(data) {
		$scope.companies = data;
	})

	api.companies.getFields().then(function(data) {
		$scope.salesforceFields = data;
		console.log("salesforce fields", $scope.salesforceFields);
	})

	$scope.getCompany = function getCompany(id) {
		api.getCompany(id).then(function(response) {
			$scope.company = response;
		})
	}
	
	$scope.logNotes = function logNotes(noteSubject, noteDescription, vfaId, companyId) {
		var note = 
		{
			noteSubject:      noteSubject,
			noteDescription:  noteDescription,
			vfaId:            vfaId,
			companyId:        companyId, 
			type:             "company"
		}
		
		api.notes.post(note).then(function( response ) {
			$scope.noteDescription = "";
			$scope.noteSubject     = "";
		})
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
	];
});
