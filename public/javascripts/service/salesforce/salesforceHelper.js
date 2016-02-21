angular.module('vfaDashboard').factory('salesforceHelper', function($q, _) {
    return {
        getChildRecords: function getChildRecords(activeFields, apiPromise) {
            var deferred = $q.defer();
            apiPromise.then(function(children) {

                var filteredChildren = _.map(children, function(child) {
                    return _.pick(child, activeFields);
                });

                // console.log('children filtered: ', filteredChildren);
                deferred.resolve(filteredChildren);
            });
            return deferred.promise;
        }, 

        getRecordValues: function getRecordValues(fields, apiPromise) {
        	var deferred = $q.defer();
	        apiPromise.then(function(data) {
	            // console.log('record promise data: ', data);
	            var allData = _.map(data, function(field, key) {
	                return { name: key, value: field };
	            });
	            // console.log('all data', allData);
	            var liveData = _.filter(allData, function(field) {
	                    return _.indexOf(fields, field.name) >= 0;
	                })
	                // console.log('record data: ', liveData);
	            deferred.resolve(liveData);
	            // console.log('company data', allData);
	        });
	        return deferred.promise;
        }
    }
});