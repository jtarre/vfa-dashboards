angular.module('vfaDashboard').factory('auth', function($rootScope) {
	return {
		isLoggedIn: function isLoggedIn() {
			if($rootScope.user) {
				return true;
			} else {
				return false;
			}
		}
	}
});
