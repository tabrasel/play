// Uses the color-namer module by zeke (https://www.npmjs.com/package/color-namer)

const colorNamer = require('color-namer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index', {color: null, guesses: null});
});

app.post('/', function (req, res) {
	res.render('index');
	
	response = colorNamer(req.body.color, { pick: ['ntc'] });
	//console.log(response);
	
	let text = response.ntc[0].name;
	for (let i = 1; i < 5; i++) {
		text += ", " + response.ntc[i].name;
	}

	//console.log("Guess: " + text);
	res.render('index', {color: req.body.color, guesses: text});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})