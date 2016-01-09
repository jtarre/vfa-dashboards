angular.module('vfaDashboard').factory('surveysApi', function($http) {
	return {
		getForFellow: function getForFellow(id, type) {
			return $http.get("/api/fellows/" + id + "/surveys/" + type)
				.then(function (response) {
					return response.data;
				});
		}
	}
})