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

    var getRecordInfo = function getRecordInfo(fields, apiPromise) {
        var deferred = $q.defer();
        apiPromise.then(function(data) {
            console.log('record promise data: ', data);

            var activeData = _.pick(data, fields);
            // var allData = _.map(data, function(field, key) {
            // 	return {name: key, value: field};
            // });
            // console.log('all data', data);
            // var liveData = _.filter(allData, function(field) {
            // 	return _.indexOf(fields, field.name) >= 0;
            // })
            console.log('record data: ', activeData);
            deferred.resolve(activeData);

        });
        return deferred.promise;
    };

    $scope.$watch('id', function(newId) {
        if (!newId) {
            console.log('no new Id yet.');
        } else {
            getRecordInfo(contactFields, api.contacts.getOne(newId))
                .then(function(contact) {
                    $scope.contact = contact;
                    api.companies.getCompany(contact.AccountId).then(function(data) {
                        console.log('account data: ', data);
                        $scope.companyName = data.Name;
                    });
                });
        }
    })

    getRecordInfo(contactFields, api.contacts.getOne($scope.id))
        .then(function(contact) {
            $scope.contact = contact;
            api.companies.getCompany(contact.AccountId).then(function(data) {
                console.log('account data: ', data);
                $scope.companyName = data.Name;
            });
        });
});