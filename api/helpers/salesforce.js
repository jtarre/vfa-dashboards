var Q = require('q');
var jsforce = require('jsforce');
var _       = require('lodash');

module.exports.connection = function connection() {
	var conn = new jsforce.Connection({
					clientSecret: process.env.CLIENT_SECRET,
					clientId:     process.env.CLIENT_ID,
					loginUrl:     process.env.LOGIN_URL,
					instanceUrl:  process.env.INSTANCE_URL,
					redirectUri: process.env.REDIRECT_URI
				});
	return conn;
};

module.exports.login = function login(obj) {
	var deferred = Q.defer();
	obj.conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		if(err) {
			console.error(err);
			deferred.reject(err);
		} else {
			obj.userInfo = userInfo;
			console.log("userInfo", userInfo);
			deferred.resolve(obj);
		}
	});
	return deferred.promise;		
};

module.exports.getAccountById = function getAccountById(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Account').retrieve(obj.id, function(err, account) {
		if(err) {
			console.error(err);
			obj.err = err;
			deferred.reject(obj);
		} else {
			obj.account = account;
			deferred.resolve(obj);
		}	
	});
	return deferred.promise;
};

module.exports.getContactById = function getContactById(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Contact').retrieve(obj.Id, function(err, contact) {
		if(err) {
			console.error(err);
			obj.err = err;
			deferred.reject(obj);
		} else {
			obj.contact = contact;
			deferred.resolve(obj);
		}	
	})
	return deferred.promise;
};

module.exports.getOpportunityById = function getOpportunityById(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Opportunity').retrieve(obj.Id, function(err, opportunity) {
		if(err) {
			console.error(err);
			obj.err = err;
			deferred.reject(obj);
		} else {
			obj.opportunity = opportunity
			deferred.resolve(obj);
		}	
	});
	return deferred.promise;
};

module.exports.getAccounts = function getAccounts(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Account')
		.find(obj.conditions || {}, obj.fields || "*")
		.sort(obj.sort || {})
		.execute( function(err, accounts) {
			if(err) {
				console.error(err);
				obj.err = err;
				deferred.reject(err);
			} else {
				obj.accounts = accounts;
				deferred.resolve(obj);
			}
		});
	return deferred.promise;
};

module.exports.getContactsForAccount = function getContactsForAccount(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Contact')
			.find({
				AccountId: obj.id
			}, "*")
			.sort( { Name: 1} )
			.execute( function(err, contacts) {
				if(err) { 
					console.error(err);
					deferred.reject(err); 
				} else {
					obj.contacts = contacts;
					deferred.resolve(obj);	
				}
			});
	return deferred.promise;
};

module.exports.getOpportunitiesForAccount = function getOpportunitiesForAccount(obj) {
	var deferred = Q.defer();
	console.log("opps on server");
	obj.conn.sobject('Opportunity')
			.find({
				AccountId: obj.id
			}, "*")
			.sort( { Name: 1} )
			.execute( function(err, opportunities) {
				if(err) { 
					console.error(err);
					deferred.reject(err); 
				} else {
					obj.opportunities = opportunities;
					deferred.resolve(obj);	
				}
			});
	return deferred.promise;
};

module.exports.getActivitiesForAccount = function getActivitiesForAccount(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Task')
			.find({
				AccountId: obj.id,
				Status: "Completed"
			}, "*")
			.execute( function(err, activities) {
				if(err) { 
					console.error(err);
					deferred.reject(err); 
				} else {
					obj.activities = activities;
					deferred.resolve(obj);	
				}
			});
	return deferred.promise;
};

module.exports.getContactsForAccount = function getContactsForAccount(obj) {
	var deferred = Q.defer();
	console.log("get contacts on server");
	obj.conn.sobject('Contact')
			.find({
				AccountId: obj.id,
			}, "*")
			.sort( { Name: 1} )
			.execute( function(err, contacts) {
				if(err) { 
					console.error(err);
					deferred.reject(err); 
				} else {
					console.log("got contacts");
					obj.contacts = contacts;
					deferred.resolve(obj);	
				}
			});
	return deferred.promise;
};