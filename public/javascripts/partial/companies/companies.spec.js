// describe('companiesCtrl', function() {

//     var scope,ctrl,template;
//     var api,q,companies, users;
//     var state, stateParams;

//     beforeEach(module('vfaDashboard'));

//     beforeEach(inject(function($rootScope, $compile, $templateCache, _api_, _$q_) {
//       scope = $rootScope.$new();
//       q = _$q_;
//       api = _api_;
//       companies = [];
//       users = [];
//       // state = _$state_;
//       // stateParams = _$stateParams_;

//       spyOn(api.companies, 'get').and.callFake(function() {
//         var deferred = q.defer();
//         deferred.resolve(companies);
//         return deferred.promise;
//       });

//       spyOn(api.users, 'getAll').and.callFake(function() {
//         var deferred = q.defer();
//         deferred.resolve(users);
//         return deferred.promise;
//       });

//       spyOn(api.companies, 'getFields').and.callFake(function() {
//         var deferred = q.defer();
//         deferred.resolve(fields);
//         return deferred.promise;
//       });

//       template = $compile($templateCache.get('public/javascripts/partial/companies/companies.html'))(scope);
//       setFixtures(template);
//       scope.$apply();
//     }));

//     it('should exist', function() {
//         expect(template).toBeInDOM();
//         //toEqual
//         //ToBe
//         //ToContains
//         //toHAveBeenCalledWith
//         //jasmine jquery
//         //jasmine
//     });

//     // describe("#someunitfunction", function() {
//     //   it("should do something", function() {
//     //     expect("somethingtobe").toBeEqualTo(4);
//     //   })
//     // })

// });
