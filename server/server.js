var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./workers/openDataCaller');
var getCrimeLocs = require('./heatmapUtils')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', function(req, res) {
  getCrimeLocs(function(locations) {
    res.send(locations);
  });
});

app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;