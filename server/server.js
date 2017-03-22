var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./workers/openDataCaller');
var utils = require('./utils');
var heatmap = require('./heatmapUtils');
var geo = require('./geoSpatialUtils');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', function(req, res) {
  utils.getCrimeLocs(function(locations) {
    res.send(locations);
  });
});


// return number of crimes that happened and crime rating 
// [[[-122.41236300000003, 37.7868476], [-122.41236300000003, 37.7868476], [{street: 'Market St', counter: 5, rating: 'red'}]], [], [], []]

app.post('/ratings', function(req, res) {
  utils.convertDirectionsToStreet(req, function(err, response) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.send(JSON.stringify(response));
    }
  });
});


// for testing geospatial searches
app.get('/nearbyCrimes', function(req, res) {
  heatmap.nearbyCrimes(function(locations) {
    res.send(locations);
  });
});

app.post('/boxCrimesByStreet', function(req, res) {
  // the directions var in the line below will be passed into the query
  // when getting data from the client
  // until then I have provided some test data.

  // var directions = req.body.directions;
  var test = [[[-122.410312, 37.782182], [-122.405677, 37.778527]]];
  var test2 = [[[-122.419684, 37.782110], [-122.416702, 37.782458]]];
  var test3 = test.concat(test2);
  
  geo.findBoxCrimesByLine(test3, function(crimesOnStreet) {
    res.send(JSON.stringify(crimesOnStreet));
  });
});

app.get('/crimesByStreet', function(req, res) {
  var test = [[[-122.410312, 37.782182], [-122.405677, 37.778527]]];
  heatmap.findCrimesByLine(test, function(crimesOnStreet) {
    res.send(JSON.stringify(crimesOnStreet));
  });
});

app.get('/boxCrimes', function(req, res) {
  geo.findAllBoxes(function(boxCrimes) {
    res.send(boxCrimes);
  });
});

app.get('/crimes', function(req, res) {
  heatmap.findAll(function(boxCrimes) {
    res.send(boxCrimes);
  });
});



app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;
