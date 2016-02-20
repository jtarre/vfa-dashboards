angular.module('vfaDashboard').directive('companyProfile', function(_) {
	return {
		restrict: "E",
		scope: {
			id: "=id"
		},
		templateUrl: "javascripts/directive/companyProfile/companyProfile.html",
		controllerUrl: "javascripts/directive/companyProfile/companyProfileCtrl.js",
		link: function (scope, element, attrs) {
			// console.log("company elements: ", element);
			// console.log("company attrs: ", attrs);
			// console.log("company scope: ", scope);
			// TODO: need to pass in Fellow id
		}	
	}
	
})