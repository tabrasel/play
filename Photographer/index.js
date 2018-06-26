(function() {
	"use strict";

	/**
	 * Give functionality to the search and clear buttons.
	 */
	window.onload = function() {
		$("search-button").onclick = imageSearch;
		$("clear-button").onclick = function() {
			$("gallery").innerHTML = "";
			$("search-bar").value = "";
		}
	};

	/**
	 * Fetches image data from the server based on search term.
	 */
	function imageSearch() {
		let gallery = $("gallery");
		gallery.innerHTML = "";

		// Show loading text
		let loadingCard = document.createElement("div");
        let loadingText = document.createElement("h2");
        loadingText.innerText = "Loading images...";
        loadingCard.appendChild(loadingText);
        gallery.appendChild(loadingCard);

        // Generate url with query
		let query = "search=" + $("search-bar").value;
		let url = "http://localhost:3000/?" + query;

	    fetch(url)
	       	.then(checkStatus)
	       	.then(JSON.parse)
	       	.then(populateGallery)
	       	.catch(function(error) {
	        	console.log(error);
	       	});
	}

	/**
	 * Populate the gallery section with the images from a server request, along with the website they came from.
	 * @param response - The server fetch response as a JSON object.
	 */
	function populateGallery(response) {
		gallery.innerHTML = "";

        for (let i = 0; i < response.images.length; i++) {
        	// Show image in a stylized card
        	let imageCard = document.createElement("div");
        	imageCard.classList.add("shadow");
        	imageCard.classList.add("text-center");
        	let image = document.createElement("img");
        	image.src = response.images[i].url;

        	// Show source website title
        	let titleObj = document.createElement("p");
        	let url = response.images[i].url;
        	let titleStart = url.indexOf(":") + 3;
        	let title = url.substr(titleStart, url.length - titleStart);
			titleObj.innerText = title.substr(0, title.indexOf("/"));

        	imageCard.appendChild(image);
        	imageCard.appendChild(titleObj);
        	gallery.appendChild(imageCard);
        }
	}

	/**
	 * Checks the status of an AJAX fetch request.
	 * @param response - The fetch response.
	 * @return either the contents of a successful response or a rejected Promise
	 */
	function checkStatus(response) {
	    if (response.status >= 200 && response.status < 300) {
	        return response.text();
	    } else {
	        return Promise.reject(new Error(response.status + ": " + response.statusText));
	    }
	}

	/**
	 * Finds an element by its id.
	 * @param String id - The id of the element.
	 * Return the document element.
	 */
	function $(id) {
		return document.getElementById(id);
	}

})();