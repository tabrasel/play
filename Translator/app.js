(function() {
	'use strict';

	var app = angular.module('app', []);

	app.controller('ctr', function($scope, $http) {
		
		$scope.translation = "(No translation)";
		$scope.errors = "";

		$scope.translate = function() {
			let url = "http://localhost:3000/?to=" + $scope.to + "&phrase=" + $scope.phrase;
			//alert(url);
			$http.get(url)
			    .then(function(response) {
			        $scope.translation = response.data.text;

			        $scope.errors = response.data.from.text.value;
			    });
		};
	});

})();