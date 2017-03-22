var dbCrime = require('./models/crime.js');
var dbRating = require('./models/rating.js');
var request = require('request');

var getCrimeLocs = function (callback) {
  dbCrime.findLocations(function(results) {
    callback(results);
  });
};

var convertLatLngToStreet = function(lng, lat, callback) {
  var url =  `http://locationiq.org/v1/reverse.php?format=json&key=6bc67043075bb2c0f0b3&lat=${lat}&lon=${lng}`;
  request(url, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      var street = JSON.parse(body).address.road;
      dbRating.findRatingEntry(street, function(err, results) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      })
    }
  });
};

var convertDirectionsToStreet = function(req, callback) {
  var responseObj = req.body.streets;
  for (var i = 0; i < req.body.length; i++) {
    utils.convertLatLngToStreet(req.body.streets[i][0][0], req.body.streets[i][0][1], function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        responseObj[i].push(results);
      }
    });
    if (i === req.body.length - 1) {
      callback(responseObj);
    }
  }
}

module.exports.getCrimeLocs = getCrimeLocs;
module.exports.convertLatLngToStreet = convertLatLngToStreet;
module.exports.convertDirectionsToStreet = convertDirectionsToStreet;
