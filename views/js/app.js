angular.module("main", [])
         .controller("info", function($scope, $http) {
            $scope.disk = {};
            $scope.processes = {};
            $scope.tasks = {};

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

         });