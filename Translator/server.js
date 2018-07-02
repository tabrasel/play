// Uses the google-translate-api module by Matheuss (https://www.npmjs.com/package/google-translate-api)
// Uses the translate module by Francisop (https://www.npmjs.com/package/translate) and the Yandex Translation API (https://translate.yandex.com/developers)

// Import modules
var googleTranslate = require('google-translate-api');

var yandexTranslate = require('translate');
yandexTranslate.engine = "yandex";
yandexTranslate.key = "trnsl.1.1.20180628T183211Z.50998dcbe302073b.6abc7c778438b20f07ae58c3a156932d05f743ac";

var express = require('express');
var app = express();

// Enable Cross-Origin Resource Sharing (CORS) to recieve reqests to localhost. Read more at: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// When a GET request is made, translate the given phrase from the source language to the target language 
app.get('/', function(req, res, next) {
	yandexTranslate(req.query.phrase, {from: req.query.sourcelanguage, to: req.query.targetlanguage}).then(function(results) {
		res.set('Content-Type', 'application/json');
		res.send({ text: results });
	}).catch(function(err) {
		console.error(err);
	});
	
	/*
	GOOGLE TRANSLATE	
	googleTranslate(req.query.phrase, {from: req.query.sourcelanguage, to: req.query.targetlanguage}).then(function(results) {
		res.set('Content-Type', 'application/json');
		res.send(results);
	}).catch(function(err) {
	    console.error(err);
	});
	*/
});

// Listen on port 3000 for requests from clients
app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});