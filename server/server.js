var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var apiCall = require('./workers/openDataCaller');
var utils = require('./utils');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', (req, res) => {
  utils.getCrimeLocs()
    .then((locations) => {
      res.send(locations);
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(404);
      res.end();
  });
});


// return number of crimes that happened and crime rating 
// [[[-122.41236300000003, 37.7868476], [-122.41236300000003, 37.7868476], [{street: 'Market St', counter: 5, rating: 'red'}]], [], [], []]

app.post('/ratingsForEntireStreet', function(req, res) {
  utils.convertDirectionsToStreet(req, function(err, response) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.send(JSON.stringify(response));
    }
  });
});


app.post('/ratings', (req, res) => {
  
  var directions = req.body.streets;
  utils.findCrimesByLine(directions)
    .then((crimesPerStreet) => {
      res.send(JSON.stringify(crimesPerStreet));
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(500);
      res.end();
    });

});


app.get('/allCrimes', (req, res) => {
  utils.findAllCrimes()
    .then((crimes) => {
      res.json(crimes);
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(500);
      res.end();
    });
});


app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;
