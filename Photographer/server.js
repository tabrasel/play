// Uses the g-i-s Google Image Seach module by Jim Kang (https://www.npmjs.com/package/g-i-s)

var imageSearch = require('g-i-s');
var express = require('express');
var app = express();

// Allows CORS so we can recieve fetch reqests to localhost
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
	imageSearch(req.query.search, function(err, results) {
		res.set('Content-Type', 'application/json');
		res.send({images: results});
	});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});