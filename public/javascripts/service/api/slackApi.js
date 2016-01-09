angular.module('vfaDashboard')
	.factory('slackApi', function($http) {
		return {
			create: function create(){
				console.log("send slack")
				return $http.post('api/slack', message)
							.then(function(response) {
								return response.data;
							})
			}
		}
	})