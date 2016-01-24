angular.module('vfaDashboard').directive('accountCreate', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/accountCreate/accountCreate.html",
		controllerUrl: "javascripts/directive/accountCreate/accountCreateCtrl.js",
		link: function (scope, element, attrs) {
			// console.log("contact elements: ", element);
			// console.log("contact attrs: ", attrs);
			// console.log("contact scope: ", scope);
		}	
	}
	
})