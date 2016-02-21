angular.module('vfaDashboard').controller('companyProfileCtrl', function($scope, _, api, accountsApi, supportersApi, $q) {
    $scope.isEdit = false;

    console.log('scope id', $scope.id);
    $scope.companyInfo = [
        "Id",
        'OwnerId',
        "CoPa_Association__c",
        "Website",
        "VFA_City__c",
        "Description",
        "Year_Founded__c",
        "NumberOfEmployees",
        "Industry_USE__c",
        "Funding_Type__c",
        "Funding_Amount__c",
        "Company_Type__c",
        "Product_Type__c",
        "Customer_Type__c",
        "Female_Founder__c",
        "URM_Founder__c",
        "Twitter_Handle__c"
    ];

    var contactFields = [
        'Name',
        'FirstName',
        'LastName',
        'Phone',
        'Email',
        'Title',
        'Description',
        'VFA_Association__c'
    ];

    var opportunityFields = [
        'Name',
        'OwnerId',
        'Description',
        'Type',
        'CloseDate',
        'StageName',
        'Amount',
        'ExpectedRevenue',
        'ForecastCategoryName',
        'NextStep'
    ]

    var activityFields = [
        'OwnerId',
        'ActivityDate',
        'Subject',
        'Description'
    ]

    var getMetaFieldsPromise = function getMetaFieldsPromise(fields, apiPromise) {
        var deferred = $q.defer();
        apiPromise.then(function(data) {
            // console.log('the real meta fields: ', data.fields);
            var allFields = _.map(data.fields, function(field) { // trim the meta fields to a subset of values.
                return { name: field.name, type: field.type, label: field.label, picklistValues: field.picklistValues }
            });

            var activeFields = _.filter(allFields, function(field) { // trim the fields to the ones I want to display
                // console.log('field in filter: ', field);
                return _.indexOf(fields, field.name) >= 0;
            });

            // console.log('meta fields v2: ', activeFields);
            deferred.resolve(activeFields);
        });
        return deferred.promise;
    };

    var getRecordInfo = function getRecordInfo(fields, apiPromise) {
        var deferred = $q.defer();
        apiPromise.then(function(data) {
            var activeData = _.pick(data, fields);
            // console.log('record promise data: ', data);
            // var allData = _.map(data, function(field, key) {
            //     return { name: key, value: field };
            // });
            // console.log('all data', allData);
            // var activeData = _.filter(allData, function(field) {
            //     return _.indexOf(fields, field.name) >= 0;
            // })
            console.log('active data: ', activeData);
            deferred.resolve(activeData);
            // console.log('company data', allData);
        });
        return deferred.promise;
    };



    var getChildRecords = function getChildRecords(activeFields, apiPromise) {
        var deferred = $q.defer();
        apiPromise.then(function(children) {

            var filteredChildren = _.map(children, function(child) {
                return _.pick(child, activeFields);
            });

            // console.log('children filtered: ', filteredChildren);
            deferred.resolve(filteredChildren);
        });
        return deferred.promise;
    };


    var getRecordData = function getRecordData(fieldsPromise, companyInfoPromise) {
        var deferred = $q.defer();
        $q.all([fieldsPromise, companyInfoPromise]).then(function(values) {
            // console.log('values', values[0], values[1]);
            console.log('fields promise in all: ', values[0]);
            console.log('record value promise in all: ', values[1]);
            var fieldsGroupedByName = _.keyBy(values[0], 'name');
            

            var valuesMapped = _.map(values[1], function(value, field) {
                return {name: field, value: value};
            });
            var valuesGroupedByName = _.keyBy(valuesMapped, 'name');

            console.log('fields grouped: ', fieldsGroupedByName);
            console.log('values grouped: ', valuesGroupedByName);

            var mergeFieldNValues = _.merge(fieldsGroupedByName, valuesGroupedByName);

            var arrayOfFieldNValues = _.map(mergeFieldNValues, function(field, name) {
                return field;
            })

            console.log('merge field and values: ', mergeFieldNValues);
            console.log('array of values: ', arrayOfFieldNValues);

            deferred.resolve(arrayOfFieldNValues);
            // deferred.resolve();
        });
        return deferred.promise;
    }

    $scope.$watch('id', function(newId) {
        console.log('new Id: ', newId);
        if (!newId) {
            console.log('new id evaluates to false. is probably null.');
        } else {
            getRecordData(getMetaFieldsPromise($scope.companyInfo, api.companies.getFields()), getRecordInfo($scope.companyInfo, api.companies.getCompany(newId)))
                .then(function(data) {
                    // console.log('company data: ', data);
                    $scope.companyData = data;
                }, function(error) {
                    console.error(error);
                });

            getChildRecords(contactFields, api.companies.getContacts(newId))
                .then(function(contacts) {
                    $scope.contacts = contacts;
                });

            getChildRecords(opportunityFields, api.opportunities.getForCompany(newId))
                .then(function(opportunities) {
                    $scope.opportunities = opportunities;
                });

            getChildRecords(activityFields, accountsApi.getActivities(newId))
                .then(function(activities) {
                    $scope.activities = _.forEach(activities, function(activity) {
                        activity.Description = _.truncate(activity.Description, { 'length': 500, 'omission': ' [...]' })
                    });
                })
        }
    })

    getRecordData(getMetaFieldsPromise($scope.companyInfo, api.companies.getFields()), getRecordInfo($scope.companyInfo, api.companies.getCompany($scope.id)))
        .then(function(data) {
            // console.log('company data: ', data);
            $scope.companyData = data;
        }, function(error) {
            console.error(error);
        });

    getChildRecords(contactFields, api.companies.getContacts($scope.id))
        .then(function(contacts) {
            $scope.contacts = contacts;
        });

    getChildRecords(opportunityFields, api.opportunities.getForCompany($scope.id))
        .then(function(opportunities) {
            $scope.opportunities = opportunities;
        });

    getChildRecords(activityFields, accountsApi.getActivities($scope.id))
        .then(function(activities) {
            $scope.activities = _.forEach(activities, function(activity) {
                activity.Description = _.truncate(activity.Description, { 'length': 500, 'omission': ' [...]' })
            });
        })

    $scope.users;
    api.users.getAll()
        .then(function(users) {
            $scope.users = users;
        });

    $scope.getUser = function getUser(userList, id) {
        var user = _.find(userList, function(value) {
            return value.Id === id;
        });
        if (user) {
            return user.Name;
        } else {
            return "";
        }

    }



    $scope.recentlyUpdated = false;
    $scope.updateInProgress = false;
    $scope.updateErrorMessage = false;
    $scope.update = function update(companyInfo) {
        $scope.recentlyUpdate = false;
        $scope.updateInProgress = true;
        $scope.updateErrorMessage = false;
        var salesforceData = {};
        _.forEach(companyInfo, function(salesforceField, index) {
            salesforceData[salesforceField.name] = salesforceField.value;
        });
        console.log("id and data on client", salesforceData);
        api.companies.update(salesforceData).then(function(response) {
            console.log("response from server after update", response);
            $scope.updateInProgress = false;
            $scope.recentlyUpdated = "https://na14.salesforce.com/" + response.id;
        }, function(error) {
            $scope.updateErrorMessage = "Sorry, please try again or contact JTD.";
        });
    };

})