// Uses the color-namer module by zeke (https://www.npmjs.com/package/color-namer)

const colorNamer = require('color-namer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index', {color: null, guesses: null});
});

app.post('/', function (req, res) {
	// Gathers all given ntc colors that match the user's color form request 
	response = colorNamer(req.body.color, { pick: ['ntc'] });
	
	// Makes a string of the first five similar color names
	let colorNames = response.ntc[0].name;
	for (let i = 1; i < 5; i++) {
		colorNames += ", " + response.ntc[i].name;
	}

	// Renders the 'index.ejs' file, specified by the set view engine
	res.render('index', {color: req.body.color, guesses: colorNames});
});

// Make the app respond to requests recieved on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})