angular.module('vfaDashboard').factory('accountsApi', function($http) {
	return {
		getBySearch: function getBySearch(search) {
			return $http.get("/api/accounts/search/" + search).then(function(response) {
				return response.data;
			})
		},

		getActivities: function getActivities(accountId) {
				return $http.get('/api/accounts/' + accountId + '/activities').then(function(response) {
					return response.data;
				})
			}
	}
})