vfaDashboard.directive("navbar", function($http) {
	return {
		restrict   : "E",
		scope      : {},
		templateUrl: "javascripts/directive/navbar/navbar.html",
		controller : function($http, $scope, $q) {
			// var deferred = $q.defer();

			$scope.loginState = {
				navText: "",
				navHref: ""
			};
			$http.get("/loggedin")
				.success(function(user) {
					console.log("User", user);	
					if(user !== "0") {
						console.log("if condition");
						$scope.loginState.navText = "Logout";
						$scope.loginState.navHref = "/logout";
						console.log("scope", $scope.loginState.navText);
						// deferred.resolve();
					} else {
						console.log("else condition");
						$scope.loginState.navText = "Login";
						$scope.loginState.navHref = "auth/google/";
						// deferred.reject();
						console.log("scope", $scope.loginState.navText);
					}

					console.log("scope", $scope.loginState.navText);
				});
		},
		link       : function(scope, element, attrs) { // DOM manipulation
			 
			console.log("cmon navbar");
		} 
	}
});