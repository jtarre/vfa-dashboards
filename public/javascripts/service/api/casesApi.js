angular.module('vfaDashboard').factory('casesApi', function($http) {
	return {
		create: function create(subject, description, user, fellow, type) {
			var fellowId = '';
			var userId = '';

			if(fellow) {
				fellowId = '';
			}

			if(user) {
				userId = '';
			}

			var newCase = {
				Subject: subject,
				Description: description,
				Origin: "Email",
				Status: "In Progress",
				Type: type,
				OwnerId: userId,
				ContactId: fellowId
			}; 
			return $http.post("/api/cases", newCase)
				.then( function (response) {
					console.log("new case response: ", response);

					return response.data;
				})
		},

		getForFellow: function getForFellow(id) {
			return $http.get("/api/cases/fellows/" + id)
				.then( function (response) {
					return response.data;
				})
		},

		getTypes: function getTypes() {
			return $http.get("/api/cases/types")
				.then(function(response) {
					console.log("get case types: ", response);
					return response.data;
				});
		}
	}
})
