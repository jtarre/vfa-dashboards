angular.module('vfaDashboard').controller('fellowProfileCtrl', function(_) {

// how do i get fellow info on page
$scope.fellow;
$scope.fellowError = false;
api.fellows.getFellow().then(function(data) {
	$scope.fellow = data;
}, function(error) {
	$scope.fellowError = "Sorry, please try again or contact JTD"
}) // need to have id

$scope.updateInProgress = false;
$scope.updateError = false;
$scope.update = function update() {
	$scope.updateInProgress = false;
	$scope.updateError = false;

	api.contacts.update() // this doesn't exist yet

}

});