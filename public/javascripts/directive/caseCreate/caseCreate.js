angular.module('vfaDashboard').directive('caseCreate', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/caseCreate/caseCreate.html",
		controllerUrl: "javascripts/directive/caseCreate/caseCreateCtrl.js",
		link: function (scope, element, attrs) {
			// console.log("elements: ", element);
			// console.log("attrs: ", attrs);
			// console.log("scope: ", scope);
		}	
	}
	
})