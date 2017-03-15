var express = require('express');
var path = require('path');
var app = express();
var port = process.env.port || 3000;
var apiCall = require('./Models/OpenDataCaller');



app.use(express.static(__dirname + '/../client'));




app.listen(port);

console.log('Server now listening on port ' + port);