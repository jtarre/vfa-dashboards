describe('navbar', function() {

  var scope,compile,element;

  // beforeEach(module('vfaDashboard'));

  beforeEach(inject(function($rootScope,$compile) {
    scope = $rootScope.$new();
    compile = $compile;

    element = compile('<navbar></navbar>')(scope);
    setFixtures(element);
    scope.$apply();
  }));

  it('should exist', function() {
    expect(element).toBeInDOM();
  });

});
