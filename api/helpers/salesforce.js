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
	obj.conn.login(process.env.USER_EMAIL, process.env.PASSWORD, function(err, userInfo) {
		var deferred = Q.defer();
		if(err) {
			console.error(err);
			obj.err = err;
			deferred.reject(obj);
		} else {
			deferred.resolve(obj);
		}
	}
	return deferred.promise;		
};

module.exports.getAccountById = function getAccountById(obj) {
	var deferred = Q.defer();
	obj.conn.sobject('Account').retrieve(obj.Id, function(err, account) {
		if(err) {
			console.error(err);
			obj.err = err;
			deferred.reject(obj);
		} else {
			obj.account = account;
			deferred.resolve(obj);
		}	
	})
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
}

// what am i trying to figure out
// what helpers i'll need
// getAccountById
// getContactById
// getOpportunityById

// getAccounts (conditions, fields)
// getContacts (conditions, fields)
// getOpportunities (conditions, fields)

//it's two separate chains
// why doesn't jsforce just do this?
// dead simple wrapper around jsforce library