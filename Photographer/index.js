(function() {
	"use strict";

	window.onload = function() {
		$("search-button").onclick = function() {
			callAjax();
		}
	};

	function callAjax() {
		let gallery = document.querySelector("section");
		gallery.innerHTML = "";

		let loadingCard = document.createElement("div");
        let loadingText = document.createElement("h2");
        loadingText.innerText = "Loading images...";
        loadingCard.appendChild(loadingText);
        gallery.appendChild(loadingCard);

		let query = "search=" + $("search-item").value;
		let url = "http://localhost:3000/?" + query;
	    fetch(url)
	       	.then(checkStatus)
	       	.then(JSON.parse)
	       	.then(function(response) {
	            gallery.innerHTML = "";

	            

	            for (let i = 0; i < response.images.length; i++) {
	            	let imageCard = document.createElement("div");
	            	imageCard.classList.add("shadow");
	            	imageCard.classList.add("text-center");
	            	let image = document.createElement("img");
	            	image.src = response.images[i].url;

	            	let desc = document.createElement("p");
	            	let a = response.images[i].url.substr(response.images[i].url.indexOf(":") + 3, response.images[i].url.length - response.images[i].url.indexOf(":") + 3);
					desc.innerText = a.substr(0, a.indexOf("/"));

	            	imageCard.appendChild(image);
	            	imageCard.appendChild(desc);
	            	gallery.appendChild(imageCard);
	            }
	        })
	       	.catch(function(error) {
	        	console.log("There was an error: " + error);
	       	});
	}

	function checkStatus(response) {
		console.log(response);
	    if (response.status >= 200 && response.status < 300) {
	        return response.text();
	    } else {
	        return Promise.reject(new Error(response.status + ": " + response.statusText));
	    }
	}

	function $(id) {
		return document.getElementById(id);
	}

})();