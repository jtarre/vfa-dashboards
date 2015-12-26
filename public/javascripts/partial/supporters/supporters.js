vfaDashboard.controller("SupporterCtrl", function($scope, api) {

	/* 
		start up process
		1. get all accounts that are donors / have to write that
		for now can get all
		2. make sure their id is what goes into get account
		i can also reuse the getCompany endpoint. should probably generalize, 
		it's only an id after all. the client side can determine which fields to display. 
	 */

	 /* 
	 	not sure, I'm going to need this. will pass ui-sref to the next. 
	  */
	  $scope.supporters;
	  api.companies.get()
	  	.then( function(data) {
	  		console.log("company data", data);
	  		$scope.supporters = data;
	  	});
	  	
	 $scope.getAccount = function getAccount(accountId) {
	 	api.companies.get(accountId)
	 		.then( function(response) {

	 		});
	 }

});