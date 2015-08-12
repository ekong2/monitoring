angular.module("main", [])
 .controller("info", function($scope, $http, $timeout) {
    $scope.disk = {};
    $scope.processes = {};
    $scope.tasks = {};

    $scope.getData = function(){
	    $http.get('/disk').
		  then(function(response) {
		    $scope.disk = response.data;
		  }, function(response) {
		  	//Error from the server
		    console.log(response);
		  });

		$http.get('/processes').
		  then(function(response) {
		  	$scope.processes = response.data;
		  }, function(response) {
		  	//Error from the server
		    console.log(response);
		  });

		$http.get('/tasks').
		  then(function(response) {
		  	$scope.tasks = response.data;
		  	console.log($scope.tasks);
		  }, function(response) {
		  	//Error from the server
		    console.log(response);
		  });
    }

    //Repeatedly fetch data every 2 seconds
    $scope.fetchData = function(){
    	$timeout(function(){
    		$scope.getData();
    		$scope.fetchData();
    	}, 2000);
    }

    $scope.fetchData();

 });