(function() {
	"use strict";

	angular.module("app")
		.controller("TranslateController", TranslateController);

	TranslateController.$inject = ["$http"];

	function TranslateController($http) {
		var vm = this;

		///////// BINDABLE MEMBERS ////////////
		vm.archive = [];
		vm.archiveEntry = archiveEntry;
		vm.clearArchive = clearArchive;
		vm.languages = [{name: "English", 	code: "en"},
						{name: "Spanish", 	code: "es"},
					 	{name: "French", 	code: "fr"},
						{name: "German", 	code: "de"},
						{name: "Italian", 	code: "it"},
						{name: "Swedish", 	code: "sv"},
						{name: "Japanese", 	code: "ja"}];
		vm.sourceLanguage = vm.languages[0].code;
		vm.swapLanguages = swapLanguages;
		vm.targetLanguage = vm.languages[1].code;
		vm.translation = "";
		vm.translate = translate;

		///////// METHOD IMPLEMENTATION //////////

		// Enter the current phrase and its translation into the archive
		function archiveEntry() {
			vm.archive.unshift({ input: "[" + vm.sourceLanguage.toUpperCase() + "]: " + vm.phrase, 
							 	 output: "[" + vm.targetLanguage.toUpperCase() + "]: " + vm.translation });
		}

		// Empty all the contents of the archive
		function clearArchive() {
			vm.archive = [];
		}

		// Swaps the source and target languages as well as the phrase
		function swapLanguages() {
			let temp = vm.sourceLanguage;
			vm.sourceLanguage = vm.targetLanguage;
			vm.targetLanguage = temp;
			vm.phrase = vm.translation;
			vm.translate();
		}

		// Translates the current phrase and displays its translation
		function translate() {
			let url = "http://localhost:3000/?sourcelanguage=" + vm.sourceLanguage + "&targetlanguage=" + vm.targetLanguage + "&phrase=" + vm.phrase;
			$http.get(url)
			    .then(function(response) {
			        vm.translation = response.data.text;
			    }).catch(function(err) {
			    	console.log(err);
			    });
		}
	}

})();