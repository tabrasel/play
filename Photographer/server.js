// Uses the g-i-s Google Image Seach module by Jim Kang (https://www.npmjs.com/package/g-i-s)

// Import modules
var imageSearch = require('g-i-s');
var express = require('express');
var app = express();

// Enable Cross-Origin Resource Sharing (CORS) to recieve reqests to localhost. Read more at: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// When a get request is made, search for the request query item and return all the resulting image data.
app.get('/', function(req, res, next) {
	imageSearch(req.query.search, function(err, results) {
		res.set('Content-Type', 'application/json');
		res.send({images: results});
	});
});

// Listen on port 3000 for requests from clients
app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});