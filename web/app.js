const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const fsPath = require('fs-path');
var label = "Unidentified";
var auth = false;

app.use(express.static("views"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/processed', (req, res) => {
	img = req.body.img;
	fsPath.writeFile('views/images/' + req.body.name + ".jpg", img, "base64", function(err){
    	console.log("Processed file saved to views/images/");
		});
	res.send(200);
});

app.get('/', function(req, res) {
	lock = "lock"
	if (auth) {
		lock = "unlock"
	}
	res.render('index', {
		label: label,
		auth: lock
	});
});

app.listen(port, () => console.log('listening on port ' + port));
