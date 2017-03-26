let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 3000;
let apiCall = require('./workers/openDataCaller');
let utils = require('./utils');
let bodyParser = require('body-parser');

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

app.post('/ratingsForEntireStreet', (req, res) => {
  utils.convertDirectionsToStreet(req)
    .then((response) => {
      res.send(JSON.stringify(response));
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(500);
      res.end();
    });
});


app.post('/ratings', (req, res) => {
  let directions = req.body.streets;
  console.log('directions', directions);
  
  utils.findCrimesByLine(directions)
    .then((crimesPerStreet) => {
      let data = {
        crimesPerStreet: crimesPerStreet,
        // ratingMetrics: ratingMetrics,
      };
      console.log('data', data);
      res.send(JSON.stringify(data));
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