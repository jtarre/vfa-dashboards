vfaDashboard.factory("api", function($http) {
	return {
		fellows: {
			get: function() {
				return $http.get("/api/fellows").then( function(response) {
					return response.data;
				});
			},

			getFellow: function(id) {
				console.log("getting individual Fellow by id");
				return $http.get("/api/fellows/" + id).then( function(response) {
					console.log('response');
					return response.data;
				});
			}
		},

		companies: {
			get: function(type) {
				return $http.get("/api/accounts/" + type).then( function(response) {
					console.log("companies on client");
					return response.data;
				});
			},

			getCompany: function(id) {
				// console.log("company id in api service", id);
				return $http.get("/api/companies/" + id).then( function(response) {
					return response.data;
				});
			},

			getFields: function() {
				console.log("getting salesforce company fields");
				return $http.get("/api/fields/companies").then( function(response) {
					console.log("data", response.data);
					return response.data;
				});
			},

			getContacts: function(companyId) {
				return $http.get("/api/companies/" + companyId + "/contacts")
					.then( function(response) {
						console.log("get contacts response", response);
						return response.data;
					})
			},

			update: function(id, data) {
				return $http.post("/api/companies/" + id, JSON.stringify(data)).then(function(response) {
					return response.data;
				});
			}, 

			create: function(data) {
				return $http.post("/api/companies", data).then( function(response) {
					return response.data;
				})
			}
		},

		contacts: {
			create: function(contactInfo) {
				return $http.post("/api/contacts", contactInfo).then( function(response) {
					return response.data;
				})
			}
		},

		campaigns: {
			create: function(newCampaign, vfaId) {
				newCampaign.OwnerId = vfaId;
				return $http.post("/api/campaigns", newCampaign).then( function(response) {
					return response.data;
				});
			}
		},

		data: {
			getCompanies: function() {
				return $http.get("/api/data/companies").then( function(response) {
					return response.data;
				});
			}
		},

		opportunities: {

			getForCompany: function(companyId) {
				return $http.get("/api/companies/" + companyId + "/opportunities")
					.then( function(response) {
						console.log("opportunities for company", response.data);
						return response.data;
					})
			},

			create: function(companyId, opportunityData) {
				return $http.post("/api/companies/" + companyId + "/opportunities", opportunityData)
					.then( function(response) {
						return response.data;
					})
			}
		},

		notes: {
			post: function(subject, description, vfaId, objectId, type, caseId) {
				var note = {
					Description: description,
					Subject:     subject,
					OwnerId:       vfaId,

				};

				if(type === "fellow") {
					note.WhoId = objectId;
				} else {
					note.WhatId = objectId;
				}

				if(caseId) {
					note.WhatId = caseId;
				}

				return $http.post("/api/notes", JSON.stringify(note)).then( function(response) {
					return response.data;
				});
			}
		},

		users: {
			getAll: function() {
				return $http.get("/api/users")
					.then( function(response) {
						return response.data;
					})
			}
		}
	};
});
