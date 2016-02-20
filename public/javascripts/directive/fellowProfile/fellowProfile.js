angular.module('vfaDashboard').directive('fellowProfile', function(_) {
	return {
		restrict: "E",
		scope: {
			id: "=id"
		},
		templateUrl: "javascripts/directive/fellowProfile/fellowProfile.html",
		controllerUrl: "javascripts/directive/fellowProfile/fellowProfileCtrl.js",
		link: function (scope, element, attrs, api) {
			console.log("fellow elements: ", element);
			console.log("fellow attrs: ", attrs);
			console.log("fellow scope: ", scope);
			// api.fellows.getFellow(id).then(function(data) {
			// 	scope.fellow = data;
			// }, function(error) {
			// 	scope.fellowError = "Sorry, please try again or contact JTD"
			// }) // need to have id
		}	
	}
	
})