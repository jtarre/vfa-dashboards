angular.module('vfaDashboard').factory('auth', function($http, $q) {
	return {
		isLoggedIn: function isLoggedIn() {
			var deferred = $q.defer();
			$http.get("/loggedin")
				.success(function(user) {	
					if(user !== "0") {
						deferred.resolve(true);
					} else {
						deferred.reject(false);
					}
				});

			return deferred.promise;
		}
	}
});
