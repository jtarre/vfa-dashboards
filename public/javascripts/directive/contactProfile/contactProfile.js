angular.module('vfaDashboard').directive('contactProfile', function(_) {
	return {
		restrict: "E",
		scope: {
			id: "=id"
		},
		templateUrl: "javascripts/directive/contactProfile/contactProfile.html",
		controllerUrl: "javascripts/directive/contactProfile/contactProfileCtrl.js",
		link: function (scope, element, attrs) {
			console.log("contact elements: ", element);
			console.log("contact attrs: ", attrs);
			console.log("contact scope: ", scope);
			//TODO: need to pass in Fellow id
		}	
	}
	
})