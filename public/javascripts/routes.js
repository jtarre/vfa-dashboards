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
            templateUrl: 'javascripts/partial/fellow-profile/fellow-profile.html',
            resolve: {
                loggedin: checkLoggedin
            }
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
            templateUrl: 'public/javascripts/partial/companies/companies.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .state('company', {
            url: '/companies/:companyId',
            templateUrl: 'javascripts/partial/companies-profile/companies-profile.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        // .state('companyContact', {
        //     url: '/companies/:companyId/contacts/:contactId',
        //     templateUrl: 'javascripts/partial/companies-contacts/companies-contacts.html'
        // })

        // .state('companyOpportunity', {
        //     url: '/companies/:companyId/opportunities/:opportunityId',
        //     templateUrl: 'javascripts/partial/opportunities-contacts/opportunities-contacts.html'
        // })

        .state('supporters', {
            url: '/supporters',
            templateUrl: 'javascripts/partial/supporters/supporters.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        .state('supporter', {
            url: '/supporters/:supporterId',
            templateUrl: 'javascripts/partial/supporters-profile/supporters-profile.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })

        // .state('supporter.contacts', {
        //     url: '/contacts/:contactId',
        //     views: {
        //         innerBox: { //<div ui-view="innerBox"></div>
        //             templateUrl: 'javascripts/partial/supporters-contacts/supporters-contacts.html'
        //         }
        //     }

        // })

        // .state('supporter.opportunity', {
        //     url: '/opportunity/:opportunityId',
        //     views:{
        //         innerBox: {
        //             templateUrl: 'javascripts/partial/supporters-opportunities/supporters-opportunities.html' 
        //         }
        //     }
             
        // })

        .state('data', {
            url: '/data',
            templateUrl: 'javascripts/partial/data/data.counts.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/companies');

});