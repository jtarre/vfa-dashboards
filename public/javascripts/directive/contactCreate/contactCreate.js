angular.module('vfaDashboard').directive('contactCreate', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/contactCreate/contactCreate.html",
		controllerUrl: "javascripts/directive/contactCreate/contactCreateCtrl.js",
		link: function (scope, element, attrs) {
			console.log("contact elements: ", element);
			console.log("contact attrs: ", attrs);
			console.log("contact scope: ", scope);
		}	
	}
	
})