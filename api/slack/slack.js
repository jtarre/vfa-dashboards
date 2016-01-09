module.exports = function(app) {
	var request = require('request');
	var _       = require('lodash');

	app.post('/api/slack', function(req, res) {
		var message = req.body;
		// var message = {
		// 	text: "Note Message",
		// 	channel: "money-notes",
		// 	username: "note-bot"
		// };
		console.log("message: ", message);
		console.log("Slack Hook", process.env.SLACK_HOOK);

		var slackCallback = function slackCallback(err, httpResponse, body) {
			if(err) { return console.error(err); }
			console.log("slack http response: ", httpResponse.status);
			console.log("slack body: ", body);
			res.send(body);
		}
		request.post(process.env.SLACK_HOOK, message, slackCallback);

	});
}