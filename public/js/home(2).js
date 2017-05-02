
var appVar = angular.module('app', [ "ngRoute","highcharts-ng"]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		controller : 'HomeController',
		templateUrl : '/templates/HomeContent.ejs'
	}).when('/sensorcontroller', {
		controller : 'SensorController',
		templateUrl : '/templates/SensorController.ejs'
	}).when('/deepdives', {
		controller : 'DeepDivesController',
		templateUrl : '/templates/DeepDives.ejs'
	}).when('/dashboard', {
		controller : 'DashBoardController',
		templateUrl : '/templates/DashBoard.ejs'
	}).when('/addremovesensor', {
		controller : 'AddRemoveController',
		templateUrl : '/templates/SensorController.ejs'
	}).when('/sensormonitor', {
		controller : 'SensorMonitorController',
		templateUrl : '/templates/SensorMonitor.ejs'
	}).otherwise({
		controller : 'HomeController',
		templateUrl : '/templates/HomeContent.ejs'
	});
} ]);





appVar.controller("TabsCtrl", function($scope, $http) {
	$scope.tabs = [ {
		link : '#/home',
		label : 'Home',
		className : 'hometab'
	},

	];
	
	$scope.removeTab = function (index) {
		if(index !=0) {
        $scope.tabs.splice(index, 1);
		}
    };
    
    $scope.showIcon = function(index) {
    	if(index !=0) {
    		return true;
    	}
    	else
    		{
    	    return false;	
    		}
    }
});

appVar.controller("SensorController", function($scope,$window) {
	$scope.showdiv = function(viewName) {	
		if(viewName == 'addsensor')
			{
		 $("#sensorcontrols").load("templates/AddSensor.ejs");
			}
		else if(viewName == 'addremovehub')
			{
	     $("#sensorcontrols").load("templates/AddSensorHub.ejs");
			}
	}
	
});

appVar.controller("SensorMonitorController", function($scope) {
	  $scope.addPoints = function () {
	        var seriesArray = $scope.highchartsNG.series
	        var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
	    };

	    $scope.addSeries = function () {
	        var rnd = []
	        for (var i = 0; i < 10; i++) {
	            rnd.push(Math.floor(Math.random() * 20) + 1)
	        }
	        $scope.highchartsNG.series.push({
	            data: rnd
	        })
	    }

	    $scope.removeRandomSeries = function () {
	        var seriesArray = $scope.highchartsNG.series
	        var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        seriesArray.splice(rndIdx, 1)
	    }

	    $scope.options = {
	        type: 'line'
	    }

	    $scope.swapChartType = function () {
	        if (this.highchartsNG.options.chart.type === 'line') {
	            this.highchartsNG.options.chart.type = 'bar'
	        } else {
	            this.highchartsNG.options.chart.type = 'line'
	        }
	    }

	    $scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'bar'
	            }
	        },
	        series: [{
	            data: [10, 15, 12, 8, 7]
	        }],
	        title: {
	            text: 'Hello'
	        },
	        loading: false
	    }

	
	});


appVar.controller("HomeController", function($scope) {
	$scope.addTab = function(linkName,name) {
		var tab = {
			link : linkName,
			label : name,
			className : 'hometab'
		}
		var tabPresent = false;
		 for (i = 0; i < $scope.tabs.length; i++) {
		        if (angular.equals($scope.tabs[i], tab)) {
		        	tabPresent = true;
		        }
		       
		    }
		 if(tabPresent == false) {
			 $scope.tabs.push(tab);
			 $scope.activeTab = tab;
			 
		 }
		 tabPresent = false;
		
	};
	

});



appVar.controller("dashboard", function($scope, $http) {

	$scope.tuitionjson = ""

	$scope.highchartsNG = {
		options : {
			chart : {
				type : 'bar',
				events : {
					redraw : function() {
					}

				}
			}
		},
		series : [ {
			color : $scope.barcolor,
			data : []
		} ],
		title : {
			text : 'Return of Investment for Colleges'
		},
		xAxis : {
			title : {
				text : 'Date'
			},
			categories : []
		},
		yAxix : {

		},
		loading : false
	}

	angular.forEach($scope.tuitionjson, function(item) {
		console.log(item);
		$scope.highchartsNG.xAxis.categories.push(item.name)
	})

	$scope.xSeriesArray = [];
	angular.forEach($scope.tuitionjson, function(item) {
		console.log(item);
		$scope.xSeriesArray.push(item.cost)
	})
	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

	$scope.barcolor = '#166D9C';

	$scope.selectedItemChanged = function() {

		console.log($scope.selection);
		if ($scope.selection == 'Tuition Fees') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.cost)
			})
			$scope.barcolor = '#166D9C';

		} else if ($scope.selection == 'Earnings') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.earn)
			})
			$scope.barcolor = '#1F9C16'

		} else if ($scope.selection == 'Completion Rate') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.Comp)
			})
			$scope.barcolor = '#8B9C16'
		}
		$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

		// $scope.highchartsNG.options.chart.redraw();
	}

	$scope.redirect = function() {
		window.location = "#/baysian.ejs";
	}

});


