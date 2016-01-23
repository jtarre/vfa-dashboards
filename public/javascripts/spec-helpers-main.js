var lodash = angular.module('lodash', []);
lodash.factory('_', ['$window', function($window) {
  return $window._; // assumes lodash has already been loaded on the page
}]);

var vfaDashboard = angular.module("vfaDashboard", ["ui.router", "lodash", "nvd3", "ngStorage", "ngMaterial"]);

var checkLoggedin = function checkLoggedin() {
    var deferred = $q.defer();
    deffered.resolve(true);
    return deferred.promise;
}

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

vfaDashboard.controller("dataCtrl", function($scope, api) {
    $scope.data;
    $scope.filteredData;

    api.data.getCompanies().then(function(data) {
        $scope.data = data;
        $scope.filteredData = $scope.data;
        $scope.graphData = [{
            key: "Cumulative Return",
            values: $scope.filteredData
        }];
        console.log("account data\n", data);
    });

    
    $scope.filterData = function filterData(filterData) {
        console.log("let's filter");
        $scope.filteredData = filterData;
        console.log("graph data values", $scope.graphData[0].values);
    };

    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format('')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Month + Year'
            },
            yAxis: {
                axisLabel: 'New Company Partner Accounts',
                axisLabelDistance: 30
            },
            title: {
                enable: true,
                text: "Accounts: Company Partnerships"
            }
        }
    };
});
