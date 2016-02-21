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

            salesforceHelper.getChildRecords(contactFields, api.companies.getContacts(newId))
                .then(function(contacts) {
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