var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

var vfaDashboard = angular.module("vfaDashboard", ["ui.router", "underscore"]);


vfaDashboard.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'javascripts/partial/home/home.html'
        })

        .state('fellows', {
            url: '/fellows',
            templateUrl: 'javascripts/partial/fellows/fellows.html'
        })

        .state('fellows.fellow', {
            templateUrl: 'javascripts/partial/fellows/fellows.fellow.html'
        })

        .state('companies', {
            url: '/companies',
            templateUrl: 'javascripts/partial/companies/companies.html'
        })

        .state('data', {
            url: '/data',
            templateUrl: 'javascripts/partial/data/data.html'
        });


    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

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

