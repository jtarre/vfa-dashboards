vfaDashboard.factory("api", function($http) {
	return {
		fellows: {
			get: function() {
				return $http.get("/api/fellows").then(function(response) {
					return response.data;
				});
			},

			getFellow: function(id) {
				console.log("getting individual Fellow by id");
				return $http.get("/api/fellows/" + id).then(function(response) {
					console.log('response');
					return response.data;
				});
			}
		}
	};
});