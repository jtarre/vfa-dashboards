angular.module('vfaDashboard').directive('fellowProfile', function(_) {
	return {
		restrict: "E",
		templateUrl: "javascripts/directive/fellowProfile/fellowProfile.html",
		controllerUrl: "javascripts/directive/fellowProfile/contactCreateCtrl.js",
		link: function (scope, element, attrs) {
			// console.log("contact elements: ", element);
			// console.log("contact attrs: ", attrs);
			// console.log("contact scope: ", scope);
			// TODO: need to pass in Fellow id
		}	
	}
	
})