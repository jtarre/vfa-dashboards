angular.module('vfaDashboard').controller('fellowProfileCtrl', function($scope, $attrs, _, api) {

    $scope.fellowError = false;
    api.fellows.getFellow($scope.id).then(function(data) {
            $scope.fellow = data;
            console.log('fellow data: ', $scope.fellow);
        }, function(error) {
            $scope.fellowError = "Sorry, please try again or contact JTD"
        }) // need to have id

    $scope.$watch('id', function(newId) {
        if (!newId) {
            console.log('no new Id yet.');
        } else {
            api.fellows.getFellow($scope.id).then(function(data) {
                    $scope.fellow = data;
                    console.log('fellow data: ', $scope.fellow);
                }, function(error) {
                    $scope.fellowError = "Sorry, please try again or contact JTD"
                }) // need to have id
        }
    })
    $scope.updateInProgress = false;
    $scope.updateError = false;
    $scope.update = function update() {
        $scope.updateInProgress = false;
        $scope.updateError = false;
        api.contacts.update() // this doesn't exist yet
    }

});