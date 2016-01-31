angular.module('vfaDashboard').factory('accountsApi', function($http) {
	return {
		getBySearch: function getBySearch(search) {
			return $http.get("/api/accounts/" + search).then(function(response) {
				return response.data;
			})
		},

		getActivities: function getActivities(accountId) {
				return $http.get('/api/companies/' + accountId + '/activities').then(function(response) {
					return response.data;
				})
			}
	}
})