angular.module('vfaDashboard').factory('activitiesApi', function($http) {
	return {
		getForFellow: function getForFellow(id) {
			return $http.get("/api/fellows/" + id + "/activities")
				.then(function(response) {
					return response.data;
				})
		}
	}
})