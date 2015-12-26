var lodash = angular.module('lodash', []);
lodash.factory('_', ['$window', function($window) {
  return $window._; // assumes lodash has already been loaded on the page
}]);

var vfaDashboard = angular.module("vfaDashboard", ["ui.router", "lodash", "nvd3", "ngStorage", "ngMaterial"]);

vfaDashboard.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'javascripts/partial/home/home.html',
        })

        .state('fellows', {
            url: '/fellows',
            templateUrl: 'javascripts/partial/fellows/fellows.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .state('fellow', {
            url: '/fellows/:fellowId',
            templateUrl: 'javascripts/partial/fellow-profile/fellow-profile.html'
        })

        .state('campaigns', {
            url: '/campaigns',
            templateUrl: 'javascripts/partial/campaigns/campaigns.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .state('companies', {
            url: '/companies',
            templateUrl: 'javascripts/partial/companies/companies.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .state('company', {
            url: '/companies/:companyId',
            templateUrl: 'javascripts/partial/companies-profile/companies-profile.html'
        })

        .state('supporters', {
            url: '/supporters',
            templateUrl: 'javascripts/partial/supporters/supporters.html'
        })

        .state('supporter', {
            url: '/supporters/:supporterId',
            templateUrl: 'javascripts/partial/supporters-profile/supporters-profile.html'
        })

        .state('data', {
            url: '/data',
            templateUrl: 'javascripts/partial/data/data.counts.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

var checkLoggedin = function checkLoggedin($http, $q, $location, $timeout, $rootScope) {
    var deferred = $q.defer();

    $http.get("/loggedin")
        .success(function(user) {
            if (user !== '0') { // user is logged in 

                deferred.resolve();
            } else {
                $rootScope.message = "You need to log in.";
                deferred.reject();  
                $location.url("/");
            }

        });

    return deferred.promise;
}

vfaDashboard.run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

vfaDashboard.controller("dataCtrl", function($scope, api) {
    $scope.data;
    $scope.filteredData;

    api.data.getCompanies().then(function(data) {
        $scope.data = data;
        $scope.filteredData = $scope.data;
        $scope.graphData = [{
            key: "Cumulative Return",
            values: $scope.filteredData
        }];
        console.log("account data\n", data);
    });

    
    $scope.filterData = function filterData(filterData) {
        console.log("let's filter");
        $scope.filteredData = filterData;
        console.log("graph data values", $scope.graphData[0].values);
    };

    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format('')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Month + Year'
            },
            yAxis: {
                axisLabel: 'New Company Partner Accounts',
                axisLabelDistance: 30
            },
            title: {
                enable: true,
                text: "Accounts: Company Partnerships"
            }
        }
    };
});
