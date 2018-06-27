(function() {
	'use strict';

	var app = angular.module('app', []);

	app.controller('ctr', function($scope, $http) {
		
		$scope.translation = "(No translation)";

		$scope.translate = function() {
			
		
			let url = "http://localhost:3000/?phrase=" + $scope.phrase;

			//alert("Sending: " + url);

			$http.get(url)
			    .then(function(response) {
			    	//alert("Translated!");
			        $scope.translation = response.data.text;
			    });
		   
		};
	});

})();