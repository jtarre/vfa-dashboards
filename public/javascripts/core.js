var vfaDashboard = angular.module("vfaDashboard", ["ui.router"]);

vfaDashboard.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'javascripts/partial/home/home.html'
    });

    $stateProvider.state('fellows', {
        url: '/fellows',
        templateUrl: 'javascripts/partial/fellows/fellows.html'
    });

    $stateProvider.state('companies', {
        url: '/companies',
        templateUrl: 'javascripts/partial/companies/companies.html'
    });

    $stateProvider.state('data', {
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
