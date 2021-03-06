var express = require('express');
var router  = express.Router();
var jsforce = require('jsforce');
var Slack   = require('slack-node');


router.post("/", function(req, res, next) {
	// get data from client call
	// send notes to salesforce
	console.log('received post request');

	
	var subject      = req.param('subject');
	var description  = req.param('description');
	var fellowId     = req.param('fellowId');
	var vfaId        = req.param('vfaId');
	var relatedTo    = req.param('relatedTo');

	// FOR SLACK // 
	var fellow       = req.param('fellowName');
	var user         = req.param('userName');

	console.log('subject + description: ' + subject + "\n\n" + description);

	var conn = new jsforce.Connection({
	    loginUrl : process.env.LOGIN_URL,
	    clientSecret: process.env.CLIENT_SECRET, 
	    redirectUri: process.env.REDIRECT_URI,
	    clientId: process.env.CLIENT_ID,
	    instanceUrl: process.env.INSTANCE_URL
	}); 
	conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if ( err ) { 
			console.error(err); 
		}
		console.log("Authenticated!");

		conn.sobject("Task").create({
			Subject      : subject,
			Description  : description,
			OwnerId      : vfaId,
			WhoId        : fellowId,
			Status       : "Completed",
			Priority     : "Normal",
			WhatId       : relatedTo,
			ActivityDate : jsforce.Date.toDateTimeLiteral(new Date()) 
		}, function(err, ret) {
			if ( err ) { 
				console.error(err); 
				res.render('success',
				{
					result : "Unsuccessful logging notes. Don't worry. Click button again!"
				})
			}
			console.log("Id!");
			console.log("WHAT DOES A TASK LOOK LIKE");
			console.log(ret);
			console.log("logged note data: " + ret.id);

			// SLACK TIME // 

			var editedBody = description.substring(0, 200); 
			var noteSlug   = ret.id;
			var sfUrl      = "https://na14.salesforce.com";
			var slackBody  = "";
			
			if (description.length >= 200 ) {
				slackBody  = "Fellow: " + fellow + "\n" + "Note author: " + user + "\n"
				 + "Notes:\n" + editedBody + "..." + "<" + sfUrl + "/" +noteSlug + "|View in Salesforce>" 

			} else {
				slackBody  = "Fellow: " + fellow + "\n" + "Note author: " + user + "\n"
				 + "Notes:\n" + editedBody + "  <" + sfUrl + "/" +noteSlug + "|View in Salesforce>" 
			}

			var slack = new Slack();

			var webhookUri = "https://hooks.slack.com/services/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";


			slack = new Slack();
			slack.setWebhook(webhookUri);

			slack.webhook({
			  channel: "fellow-workflows",
			  username: "logged-notes-bot",
			  text: slackBody,
			}, function(err, response) {
			  console.log(response);
			});

			res.render('success',
			{
				result : "Successfully logged notes in Salesforce! Slack update sent to fellow-workflows too. Feel free to check out your handywork :)"
			})
		}); // task brackets
	
	}); // login brackets 
}) // router brackets

module.exports = router;