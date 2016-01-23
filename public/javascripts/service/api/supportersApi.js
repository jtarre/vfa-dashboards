vfaDashboard.factory("supportersApi", function($http) {
	return {
			getAll: function getAll() {
				return $http.get("/api/supporters")
					.then(function (response) {
						return response.data;
					});
			},
			getContactsForAll: function getContactsForAll() {
				// console.log("get contacts for all");
				return $http.get("/api/supporters/contacts")
					.then( function(response) {
						return response.data;
					});
			},

			getOpportunitiesForAll: function getOpportunitiesForAll() {
				return $http.get("/api/supporters/opportunities")
					.then( function(response) {
						return response.data;
					});
			},
			
			getOne: function getOne(id) {
				return $http.get("/api/supporters/" + id)
					.then( function (response) {
						return response.data;
					});
			},
			getContacts: function getContacts(id) {
				return $http.get("/api/supporters/" + id + "/contacts")
					.then( function(response) {
						return response.data;
					})
			},
			getOpportunities: function getOpportunities(id) {
				return $http.get("/api/supporters/" + id + "/opportunities")
					.then( function(response) {
						return response.data;
					})
			},
			getActivities: function getActivities(id) {
				return $http.get("/api/supporters/" + id + "/activities")
					.then( function(response) {
						return response.data;
					})
			}
		}
})