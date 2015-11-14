vfaDashboard.factory("api", function($http) {
	return {
		fellows: {
			get: function() {
				return $http.get("/api/fellows/fellows").then(function(response) {
					return response.data;
				});
			}
		}
	};
});