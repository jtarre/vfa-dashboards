angular.module('vfaDashboard').directive('noteLogger', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/noteLogger/noteLogger.html",
		scope: {
			contacts: '=contacts',
			relatedTo: '=',
			users: '='
		},
		controllerUrl: "javascripts/directive/noteLogger/noteLoggerCtrl.js",
		link: function (scope, element, attrs) {
			console.log("elements: ", element);
			console.log("attrs: ", attrs);
			console.log("scope: ", scope);
		}	
	}
	
})