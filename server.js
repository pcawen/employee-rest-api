var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('hi there!!');
});

app.listen(3001);