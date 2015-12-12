var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

var vfaDashboard = angular.module("vfaDashboard", ["ui.router", "underscore", "nvd3", "ngStorage"]);

vfaDashboard.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'javascripts/partial/home/home.html',
            // resolve: {
            //     setNavBarLoginState: ""
            // }
        })

        // .state('fellows', {
        //     url: '/fellows',
        //     abstract: true,
        //     templateUrl: 'javascripts/partial/fellows/fellows.html',
        //     resolve: {
        //         loggedin: checkLoggedin
        //         // setNavBarLoginState: ""
        //     }
        // })

        .state('fellows', {
            url: '/fellows',
            templateUrl: 'javascripts/partial/fellows/fellows.html',
            resolve: {
                loggedin: checkLoggedin
                // setNavBarLoginState: ""
            }
        })

        .state('fellow', {
            url: '/fellows/:fellowId',
            templateUrl: 'javascripts/partial/fellow-profile/fellow-profile.html'
        })

        .state('companies', {
            url: '/companies',
            templateUrl: 'javascripts/partial/companies/companies.html',
            resolve: {
                loggedin: checkLoggedin
                // setNavBarLoginState: "",
            }
        })

        .state('company', {
            url: '/companies/:companyId',
            templateUrl: 'javascripts/partial/companies-profile/companies-profile.html'
        })

        .state('data', {
            url: '/data',
            templateUrl: 'javascripts/partial/data/data.counts.html'
        });

        // .state('data.companies', {
        //     url: ''
        //     templateUrl:
        // })


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