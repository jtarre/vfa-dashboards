angular.module('vfaDashboard').directive('fellowProfile', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/fellowProfile/fellowProfile.html",
		controllerUrl: "javascripts/directive/fellowProfile/fellowProfileCtrl.js",
		link: function (scope, element, attrs) {
			console.log("fellow elements: ", element);
			console.log("fellow attrs: ", attrs);
			console.log("fellow scope: ", scope);
			// TODO: need to pass in Fellow id
		}	
	}
	
})