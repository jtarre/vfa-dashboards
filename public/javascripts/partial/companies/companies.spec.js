describe('companiesCtrl', function() {

    var scope,ctrl,template;
    var api,q,companies, users, contacts;
    var state, stateParams;
    var httpBackend;

    beforeEach(module('vfaDashboard'));

    beforeEach(inject(function($rootScope, $compile, $templateCache, _$httpBackend_, _api_, _$q_) {
      scope = $rootScope.$new();
      q = _$q_;
      api = _api_;
      httpBackend = _$httpBackend_;
      companies = [];
      users = [];
      contacts = [];
      // state = _$state_;
      // stateParams = _$stateParams_;

      spyOn(api.companies, 'get').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(companies);
        return deferred.promise;
      });

      spyOn(api.users, 'getAll').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
      });

      spyOn(api.companies, 'getFields').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(fields);
        return deferred.promise;
      });

      spyOn(api.companies, 'getContactsForAll').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(contacts);
        return deferred.promise; 
      });

      function resolve(value) {
        return {forStateAndView: function (state, view) {
          var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
          return $injector.invoke(viewDefinition.resolve[value]);
        }};
      }

      // httpBackend.whenGET('/loggedin').respond(user);

      template = $compile($templateCache.get('javascripts/partial/companies/companies.html'))(scope);
      setFixtures(template);
      scope.$apply();
    }));

    it('should exist', function() {
        expect(template).toBeInDOM();
        //toEqual
        //ToBe
        //ToContains
        //toHAveBeenCalledWith
        //jasmine jquery
        //jasmine
    });

    // describe("#someunitfunction", function() {
    //   it("should do something", function() {
    //     expect("somethingtobe").toBeEqualTo(4);
    //   })
    // })

});
