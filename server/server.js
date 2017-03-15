var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./workers/openDataCaller');
var getPosition = require('./mapsHelper');

app.use(express.static(__dirname + '/../client'));

app.get('/search', function(req, res) {
  getPosition(function(location) {
    // do something more useful than this with locaiton
    res.send(location);
  });
});

app.listen(port);

console.log('Server now listening on port ' + port);