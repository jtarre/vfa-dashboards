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
		},

		companies: {
			get: function() {
				return $http.get("/api/companies").then(function(response) {
					return response.data;
				});
			},

			getCompany: function(id) {
				// console.log("company id in api service", id);
				return $http.get("/api/companies/" + id).then(function(response) {
					return response.data;
				});
			},

			getFields: function() {
				console.log("getting salesforce company fields");
				return $http.get("/api/fields/companies").then(function(response) {
					console.log("data", response.data);
					return response.data;
				});
			}
		},

		// candidates: {
		// 	get: function() {
		// 		return $http.get("/api/candidates").then(function(response) {
		// 			return response.data;
		// 		})
		// 	}
		// }

		data: {
			getCompanies: function() {
				return $http.get("/api/data/companies").then(function(response) {
					return response.data;
				})
			}
		},

		opportunities: {
			get: function() {},
			getOpportunity: function(id){}
		},

		notes: {
			post: function(noteData) {
				console.log("\n\nnote data:");
				console.log(noteData);
				return $http.post("/api/notes", JSON.stringify(noteData)).then(function(response) {
					return response.data;
				});
			}
		}
	};
});