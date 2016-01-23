angular.module('vfaDashboard')
	.factory('slackApi', function($http) {
		return {
			create: function create(subject, description, vfa, contact, relatedTo, channel){
				var body = "*Subject*: " + subject
					+ "\n*Contact*: " + contact
					+ "\n*Related To*: " + relatedTo
					+ "\n*Author*: " + vfa
					+ "\n*Description*:"
					+ "\n" + description;

				var message = {
					text: body,
					username: "note-bot",
					channel: channel
				}
				console.log("send slack")
				return $http.post('api/slack', message)
							.then(function(response) {
								return response.data;
							})
			}
		}
	})