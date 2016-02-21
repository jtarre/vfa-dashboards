angular.module('vfaDashboard').factory('salesforceHelper', function($q, _) {
    return {
        getRecordInfo: function getRecordInfo(fields, apiPromise) {
            var deferred = $q.defer();
            apiPromise.then(function(data) {
                // console.log('record promise data: ', data);

                var activeData = _.pick(data, fields);

                // console.log('record data: ', activeData);
                deferred.resolve(activeData);

            });
            return deferred.promise;
        },
        
        getChildRecords: function getChildRecords(activeFields, apiPromise) {
            var deferred = $q.defer();
            apiPromise.then(function(children) {
                console.log('child records: ', children);
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
        },

        getRecordData: function getRecordData(fieldsPromise, valuesPromise) {
            var deferred = $q.defer();
            $q.all([fieldsPromise, valuesPromise]).then(function(values) {
                // console.log('values', values[0], values[1]);
                // console.log('fields promise in all: ', values[0]);
                // console.log('record value promise in all: ', values[1]);
                var fieldsGroupedByName = _.keyBy(values[0], 'name');


                var valuesMapped = _.map(values[1], function(value, field) {
                    return { name: field, value: value };
                });
                var valuesGroupedByName = _.keyBy(valuesMapped, 'name');

                // console.log('fields grouped: ', fieldsGroupedByName);
                // console.log('values grouped: ', valuesGroupedByName);

                var mergeFieldNValues = _.merge(fieldsGroupedByName, valuesGroupedByName);

                var arrayOfFieldNValues = _.map(mergeFieldNValues, function(field, name) {
                    return field;
                })

                // console.log('merge field and values: ', mergeFieldNValues);
                // console.log('array of values: ', arrayOfFieldNValues);

                deferred.resolve(arrayOfFieldNValues);
            });
            return deferred.promise;
        },

        getMetaFields: function getMetaFields(fields, apiPromise) {
            var deferred = $q.defer();
            apiPromise.then(function(data) {

                var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
                    return { name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues }
                });

                var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display

                    return _.indexOf(fields, field.name) >= 0;
                });
                console.log('active meta fields: ', activeFields);

                deferred.resolve(activeFields);
            });
            return deferred.promise;
        }
    }
});