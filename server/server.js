var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./Workers/openDataCaller');



app.use(express.static(__dirname + '/../client'));


app.listen(port);

console.log('Server now listening on port ' + port);