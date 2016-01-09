angular.module('vfaDashboard').factory('casesApi', function($http) {
	return {
		create: function create(subject, description, user, fellow) {
			var newCase = {
				Subject: subject,
				Description: description,
				OwnerId: user.Id,
				WhoId: fellow.profile.Id
			}; 
			return $http.post("/api/cases", newCase)
				.then( function (response) {
					return response.data;
				})
		},

		getForFellow: function getForFellow(id) {
			return $http.get("/api/cases/fellows/:id")
				.then( function (response) {
					return response.data;
				})
		}
	}
})