angular.module('vfaDashboard').directive('contactCreate', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/contactCreate/contactCreate.html",
		scope: {
			relatedTo: '=',
			users: '='
		},
		controllerUrl: "javascripts/directive/contactCreate/contactCreateCtrl.js",
		link: function (scope, element, attrs) {
			console.log("elements: ", element);
			console.log("attrs: ", attrs);
			console.log("scope: ", scope);
		}	
	}
	
})