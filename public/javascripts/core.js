var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

var vfaDashboard = angular.module("vfaDashboard", ["ui.router", "underscore", "nvd3"]);


vfaDashboard.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'javascripts/partial/home/home.html',
            // resolve: {
            //     setNavBarLoginState: ""
            // }
        })

        .state('fellows', {
            url: '/fellows',
            templateUrl: 'javascripts/partial/fellows/fellows.html',
            resolve: {
                loggedin: checkLoggedin
                // setNavBarLoginState: ""
            }
        })

        .state('fellows.fellow', {
            templateUrl: 'javascripts/partial/fellows/fellows.fellow.html'
        })

        .state('companies', {
            url: '/companies',
            templateUrl: 'javascripts/partial/companies/companies.html',
            resolve: {
                loggedin: checkLoggedin
                // setNavBarLoginState: "",
            }
        })

        .state('data', {
            url: '/data',
            templateUrl: 'javascripts/partial/data/data.html'
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


/*
    what now?
    login up & running
    now two areas
    bar charts
    and google maps
    if I can get one of each going
    on the data front,
    I already have some amount of CoPa data
    I think I'll need to clean it. 
    I'll need each account by their created date
    and I'll need to somehow bucket them
    let's read documentation.
 */

