vfaDashboard.directive("navbar", function() {
	return {
		restrict   : "E",
		scope      : {},
		templateUrl: "javascripts/directive/navbar/navbar.html",
		link       : function(scope, element, attrs) {
			console.log("cmon navbar");
		} 
	}
});