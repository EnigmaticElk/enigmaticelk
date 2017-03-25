let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 3000;
let apiCall = require('./workers/openDataCaller');
let utils = require('./utils')
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/heatmapData', function(req, res) {
  utils.getCrimeLocs(function(locations) {
    res.send(locations);
  });
});

app.post('/ratings', function(req, res) {
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

app.listen(port);

console.log('Server now listening on port ' + port);
module.exports = app;
