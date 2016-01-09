module.exports = function(app) {
	var request = require('request');
	var _       = require('lodash');

	app.post('/api/slack', function(req, res) {
		var message = req.body;
		console.log("message: ", message);
		console.log("Slack Hook", process.env.SLACK_HOOK);

		var slackCallback = function slackCallback(err, httpResponse, body) {
			if(err) { return console.error(err); }
			console.log("slack http response: ", httpResponse.status);
			console.log("slack callback body: ", body);
			res.send(body);
		}

		var options = {
			url: process.env.SLACK_HOOK,
			method: "POST",
			json: true,
			body: message
		}
		request(options, slackCallback);

	});
}