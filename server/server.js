var express = require('express');

var app = express();

var port = process.env.port || 3000;

app.get('/', function(req, res, next) {
	res.send('Hello World');
});

app.listen(port);

console.log('Server now listening on port ' + port);