(function() {
	'use strict';

	var app = angular.module('app', []);

	app.controller('ctr', function($scope, $http) {
		
		$scope.languages = [{name: "Spanish", code: "es"},
							{name: "French", code: "fr"},
							{name: "Japanese", code: "ja"}];
		$scope.to = $scope.languages[0].code;

		$scope.translation = "(No translation)";
		$scope.errors = "";
		$scope.archive = [];

		$scope.translate = function() {
			let url = "http://localhost:3000/?to=" + $scope.to + "&phrase=" + $scope.phrase;
			//alert(url);
			$http.get(url)
			    .then(function(response) {
			        $scope.translation = response.data.text;

			        $scope.errors = response.data.from.text.value;
			    });
		};


		$scope.archiveEntry = function() {
			$scope.archive.unshift({input: $scope.phrase, output: $scope.translation});
		};

		$scope.clearArchive = function() {
			$scope.archive = [];
		}
		
	});

})();