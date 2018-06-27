// Uses the google-translate-api module by Matheuss (https://www.npmjs.com/package/google-translate-api)

// Import modules
var translate = require('google-translate-api');
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
	
	translate(req.query.phrase, {to: 'es'}).then(function(results) {
		res.set('Content-Type', 'application/json');
		res.send(results);
	}).catch(function(err) {
	    console.error(err);
	});

	/*
	translate('Hello! Did you dream last night?', {to: 'es'}).then(function(results) {
		res.set('Content-Type', 'application/json');
		res.send(results);
	}).catch(function(err) {
	    console.error(err);
	});
	*/

	/*
	imageSearch(req.query.search, function(err, results) {
		res.set('Content-Type', 'application/json');
		res.send({images: results});
	});
	*/
});

// Listen on port 3000 for requests from clients
app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});