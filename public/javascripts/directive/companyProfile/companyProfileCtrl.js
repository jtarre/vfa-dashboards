angular.module('vfaDashboard').controller('companyProfileCtrl', function($scope, $q, _, api, accountsApi, supportersApi, salesforceHelper) {
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
        'Id',
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

    var getChildRecordData = function getChildRecordData(fieldsPromise, valuesPromise) {
        var deferred = $q.defer();

        $q.all([fieldsPromise, valuesPromise]).then(function(values) {
            // console.log('values', values[0], values[1]);
            console.log('meta fields: ', values[0]);
            console.log('child values: ', values[1]);

            var mergeFieldNValues = function mergeFieldNValues(fields, value) {
                // var fieldsForGrouping = _.create(fields);
                // var valuesForMapping = _.create(value);
                // console.log('field for grouping: ', fieldsForGrouping);
                // console.log('values for mapping: ', valuesForMapping);

                var fieldsGroupedByName = _.keyBy(fields, 'name');

                var valuesMapped = _.map(value, function(value, field) {
                    return { name: field, value: value };
                });
                console.log('values mapped: ', valuesMapped);
                var valuesGroupedByName = _.keyBy(valuesMapped, 'name');

                console.log('fields grouped: ', fieldsGroupedByName);
                console.log('values grouped: ', valuesGroupedByName);

                var mergeFieldNValues = _.merge(valuesGroupedByName, fieldsGroupedByName);
                console.log('merge field n values: ', mergeFieldNValues);
                var arrayOfFieldNValues = _.map(mergeFieldNValues, function(field, name) {
                    return field;
                })

                return arrayOfFieldNValues;
            }


            var valuesNFields = _.map(values[1], function(value, index) {
                console.log('mapped value: ', value);
                return mergeFieldNValues(values[0], value);
            })

            console.log('contact array of values and fields: ', valuesNFields);

            deferred.resolve(valuesNFields);
        });
        return deferred.promise;
    }

    $scope.$watch('id', function(newId) {
        console.log('new Id: ', newId);
        if (!newId) {
            console.log('new id evaluates to false. is probably null.');
        } else {
            salesforceHelper.getRecordData(salesforceHelper.getMetaFields($scope.companyInfo, api.companies.getFields()), salesforceHelper.getRecordInfo($scope.companyInfo, api.companies.getCompany(newId)))
                .then(function(data) {
                    // console.log('company data: ', data);
                    $scope.companyData = data;
                }, function(error) {
                    console.error(error);
                });
            getChildRecordData(salesforceHelper.getMetaFields(contactFields, api.contacts.getFields()), salesforceHelper.getChildRecords(contactFields, api.companies.getContacts(newId)))
                // salesforceHelper.getChildRecords(contactFields, api.companies.getContacts(newId))
                .then(function(contacts) {
                    // i'd like to assign an is edit property here.
                    // to each contact
                    console.log('contacts pre edit: ', contacts);
                    _.forEach(contacts, function(contact) {
                        _.assign(contact, { isContactEdit: false });
                    });
                    console.log('contacts post edit: ', contacts);
                    $scope.contacts = contacts;
                });

            salesforceHelper.getChildRecords(opportunityFields, api.opportunities.getForCompany(newId))
                .then(function(opportunities) {
                    $scope.opportunities = opportunities;
                });

            salesforceHelper.getChildRecords(activityFields, accountsApi.getActivities(newId))
                .then(function(activities) {
                    $scope.activities = _.forEach(activities, function(activity) {
                        activity.Description = _.truncate(activity.Description, { 'length': 500, 'omission': ' [...]' })
                    });
                })
        }
    })

    $scope.isCompanyEdit = false;
    $scope.companyEdit = function companyEdit() {
        $scope.updateCompanyMessage = false;
        $scope.updateCompanyError = false;
        $scope.updateCompanyInProgress = false;
    }

    $scope.onUpdate = function onUpdate(data) {
        $scope.updateCompanyMessage = false;
        $scope.updateCompanyError = false;
        $scope.updateCompanyInProgress = true;

        updateRecord(data, api.companies.update);
    }

    var updateRecord = function updateRecord(record, apiPromise) {
        var recordForUpdate = recordTransformForUpdate(record);
        apiPromise(recordForUpdate).then(function(data) {
            console.log('update response: ', data);
            $scope.updateCompanyInProgress = false;
            $scope.updateCompanyMessage = "Account updated!";
            $
        }, function(error) {
            console.error(error);
            $scope.updateCompanyInProgress = false;
            $scope.updateCompanyError = "Please try again or contact JTD";
        });
    }

    var recordTransformForUpdate = function recordTransformForUpdate(record) {
        var keyValueArray = _.map(record, function(field) {
            return [field.name, field.value];
        });

        console.log('key value array of array: ', keyValueArray);

        var keyValuePair = _.fromPairs(keyValueArray);
        console.log('key value pairing: ', keyValuePair);
        return keyValuePair;
    }

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