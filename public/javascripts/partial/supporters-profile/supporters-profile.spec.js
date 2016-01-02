describe("supporters profile controller", function() {

	var scope, ctrl, template;
	var api, supportersApi, q; 
	var supporters, contacts, opportunities, activities, users;
	var state, stateParams;

	beforeAll()
	beforeEach(module('vfaDashboard'));

	beforeEach(inject(function($rootScope, $compile, $templateCache, _api_, _supportersApi_, _$q_) {
		scope = $rootScope.$new();
		q = _$q_;
		api = _api_;
		supportersApi = _supportersApi_;
		supporters = [];
		contacts = [];
		opportunities = [];
		activities = [];
		users = [];

		spyOn(supportersApi, 'getOne').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(supporters);
			return deferred.promise;
		});

		spyOn(supportersApi, 'getContacts').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(contacts);
			return deferred.promise;
		});

		spyOn(supportersApi, 'getOpportunities').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(opportunities);
			return deferred.promise;
		});

		spyOn(supportersApi, 'getActivities').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(activities);
			return deferred.promise;
		});

		spyOn(api.users, 'getAll').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(users);
			return deferred.promise;
		});

		// template = $compile($templateCache.get('public/javascripts/partial/supporters-profile/supporters-profile.html'))(scope);
		// setFixtures(template);
		scope.$apply();
	}));
	
	// it('should exist', function() {
	// 	expect(template).toBeInDOM();
	// });
	describe("get user test", function() {
		it("gets users name");
		it("has an up to date users array");
		it("gets run");
	});

	describe("log notes", function() {
		it('should have fields');
		it('should pass fields to notes post')

	})
});