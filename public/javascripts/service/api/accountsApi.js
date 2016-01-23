angular.module('vfaDashboard').factory('accountsApi', function($http) {
	return {
		getBySearch: function getBySearch(search) {
			return $http.get("/api/accounts/" + search).then(function(response) {
				return response.data;
			})
		}
	}
})