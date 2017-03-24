var dbCrime = require('./models/crime.js');
var dbRating = require('./models/rating.js');
var request = require('request');
var GOOGLE_API_KEY = require('./googleMapsConfig.js');

var getCrimeLocs = function (callback) {
  dbCrime.findLocations(function(results) {
    callback(results);
  });
};

var assignStreetFromLngLat = function(lng, lat, callback) {
  var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  request(url, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      var street = JSON.parse(body).results[0].address_components[1].long_name;
      dbRating.findRatingEntry(street, function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          if (results.length < 1) {
            var defaultResponse = [{street: street, counter: 0, rating: 'green'}];
            callback(null, defaultResponse);
          } else {
            callback(null, results);
          }
        }
      })
    }
  });
};

var convertDirectionsToStreet = function(req, callback) {
  var coordsWithAddresses = req.body.streets;
  var counter = 0;
  for (var i = 0; i < req.body.streets.length; i++) {
    (function(i){
      setTimeout(function() {
        assignStreetFromLngLat(req.body.streets[i][0][0], req.body.streets[i][0][1], function(err, results) {
          if (err) {
            callback(err, null);
          } else {
            coordsWithAddresses[i].push(results[0]);
            counter++;
            if (counter === req.body.streets.length) {
              callback(null, coordsWithAddresses);
            }
          }
        });
      }, 20 * i);
    })(i);
  }
}

module.exports.getCrimeLocs = getCrimeLocs;
module.exports.convertDirectionsToStreet = convertDirectionsToStreet;
