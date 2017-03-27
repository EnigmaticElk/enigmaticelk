let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 3000;
let apiCall = require('./workers/openDataCaller');
let utils = require('./utils');
let bodyParser = require('body-parser');
let ratingInfo = require('./ratingInfo').ratingInfo;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', (req, res) => {
  utils.getCrimeLocs()
    .then((heatmapData) => {
      let data = {
        heatmapData: heatmapData,
        ratingInfo: ratingInfo
      };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.writeHead(404);
      res.end();
  });
});

// This endpoint is not currently being used by the client. Use this endpoint to access ratings for every street in the city
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
  
  utils.findCrimesByLine(directions)
    .then((crimesPerStreet) => {
      let crimeData = {
        crimesPerStreet: crimesPerStreet,
      };
      res.send(JSON.stringify(crimeData));
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
