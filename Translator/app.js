(function() {
	'use strict';

	// Define the Mr. Worldwide application module
	var app = angular.module('app', []);

	// Define the main controller for the application
	app.controller('ctr', function($scope, $http) {
		// Define all translatable languages and their codes
		$scope.languages = [{name: "English", code: "en"},
							{name: "Spanish", code: "es"},
							{name: "French", code: "fr"},
							{name: "German", code: "de"},
							{name: "Italian", code: "it"},
							{name: "Swedish", code: "sv"},
							{name: "Japanese", code: "ja"}];

		// Set initial source and target languages
		$scope.sourceLanguage = $scope.languages[0].code;
		$scope.targetLanguage = $scope.languages[1].code;

		$scope.translation = "";
		$scope.archive = [];

		// Translates the current phrase and displays its translation
		$scope.translate = function() {
			let url = "http://localhost:3000/?sourcelanguage=" + $scope.sourceLanguage + "&targetlanguage=" + $scope.targetLanguage + "&phrase=" + $scope.phrase;
			$http.get(url)
			    .then(function(response) {
			    	/*
			    	GOOGLE TRANSLATE
			        $scope.translation = response.data.text;
			        $scope.errors = response.data.from.text.value;
			        */
			        $scope.translation = response.data.tr;
			    }).catch(function(err) {
			    	console.log("Error: " + err);
			    });
		};

		// Enter the current phrase and its translation into the archive
		$scope.archiveEntry = function() {
			$scope.archive.unshift({input: "[" + $scope.sourceLanguage.toUpperCase() + "]: " + $scope.phrase, output: "[" + $scope.targetLanguage.toUpperCase() + "]: " + $scope.translation});
		};

		// Empty all the contents of the archive
		$scope.clearArchive = function() {
			$scope.archive = [];
		}

		// Swaps the source and target languages as well as the phrase
		$scope.swapLanguages = function() {
			let temp = $scope.sourceLanguage;
			$scope.sourceLanguage = $scope.targetLanguage;
			$scope.targetLanguage = temp;
			
			$scope.phrase = $scope.translation;
			$scope.translate();
		}
	});
})();