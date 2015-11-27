vfaDashboard.controller("companiesCtrl", function($scope, api) {
	
	$scope.companies;
	$scope.company;

	api.companies.get().then(function(data) {
		$scope.companies = data;
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
	
	$scope.vfaTeam;
});
