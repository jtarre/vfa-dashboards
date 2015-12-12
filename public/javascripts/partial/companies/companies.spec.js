describe('companiesCtrl', function() {

    var scope,ctrl,template;
    var api,q;

    beforeEach(module('vfaDashboard'));

    beforeEach(inject(function($rootScope, $compile, $templateCache, _api_, _$q_) {
      scope = $rootScope.$new();
      q = _$q_;

      var api = _api_;

      var companies = [];

      spyOn(api.companies, 'get').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(companies);
        return deferred.promise;
      });

      template = $compile($templateCache.get('public/javascripts/partial/companies/companies.html'))(scope);
      setFixtures(template);
      scope.$apply();
    }));

    it('should exist', inject(function() {
        expect(template).toBeInDOM();
    }));

    

});
