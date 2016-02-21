angular.module('vfaDashboard').controller('contactProfileCtrl', function($scope, $q, _, api, supportersApi) {
    // $scope.id
    // 2 versions: when you've gotten from child versions and when you haven't

    var contactFields = [
        'AccountId',
        'Phone',
        'Email',
        'Title',
        'Description',
        'VFA_Association__c'
    ];

    $scope.$watch('id', function(newId) {
        if (!newId) {
            console.log('no new Id yet.');
        } else {
            salesforceHelper.getRecordInfo(contactFields, api.contacts.getOne(newId))
                .then(function(contact) {
                    $scope.contact = contact;
                    api.companies.getCompany(contact.AccountId).then(function(data) {
                        console.log('account data: ', data);
                        $scope.companyName = data.Name;
                    });
                });
        }
    })
});