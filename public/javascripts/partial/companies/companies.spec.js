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

      var user = {"provider":"google","id":"117149021244307938304","displayName":"Jason Tarre","name":{"familyName":"Tarre","givenName":"Jason"},"emails":[{"value":"jason@ventureforamerica.org","type":"account"}],"photos":[{"value":"https://lh4.googleusercontent.com/-GurGBO6haR8/AAAAAAAAAAI/AAAAAAAAA2g/Atw72WEmBAY/photo.jpg?sz=50"}],"gender":"male","_raw":"{\n \"kind\": \"plus#person\",\n \"etag\": \"\\\"4OZ_Kt6ujOh1jaML_U6RM6APqoE/z4vtkgYvVMgIBUe4svHxo6jEeFw\\\"\",\n \"gender\": \"male\",\n \"emails\": [\n  {\n   \"value\": \"jason@ventureforamerica.org\",\n   \"type\": \"account\"\n  }\n ],\n \"objectType\": \"person\",\n \"id\": \"117149021244307938304\",\n \"displayName\": \"Jason Tarre\",\n \"name\": {\n  \"familyName\": \"Tarre\",\n  \"givenName\": \"Jason\"\n },\n \"url\": \"https://plus.google.com/117149021244307938304\",\n \"image\": {\n  \"url\": \"https://lh4.googleusercontent.com/-GurGBO6haR8/AAAAAAAAAAI/AAAAAAAAA2g/Atw72WEmBAY/photo.jpg?sz=50\",\n  \"isDefault\": false\n },\n \"isPlusUser\": true,\n \"language\": \"en\",\n \"circledByCount\": 44,\n \"verified\": false,\n \"domain\": \"ventureforamerica.org\"\n}\n","_json":{"kind":"plus#person","etag":"\"4OZ_Kt6ujOh1jaML_U6RM6APqoE/z4vtkgYvVMgIBUe4svHxo6jEeFw\"","gender":"male","emails":[{"value":"jason@ventureforamerica.org","type":"account"}],"objectType":"person","id":"117149021244307938304","displayName":"Jason Tarre","name":{"familyName":"Tarre","givenName":"Jason"},"url":"https://plus.google.com/117149021244307938304","image":{"url":"https://lh4.googleusercontent.com/-GurGBO6haR8/AAAAAAAAAAI/AAAAAAAAA2g/Atw72WEmBAY/photo.jpg?sz=50","isDefault":false},"isPlusUser":true,"language":"en","circledByCount":44,"verified":false,"domain":"ventureforamerica.org"}}

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
