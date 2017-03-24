var dbCrime = require('./models/crime.js');
var dbRating = require('./models/rating.js');
var dbGeo = require('./models/boxCrime.js');
var request = require('request');
var API_KEY = require('./googleMapsConfig.js');

var getCrimeLocs = function (callback) {
  dbCrime.findLocations(function(results) {
    callback(results);
  });
};

var assignStreetFromLngLat = function(lng, lat, callback) {
  var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
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
            var defaultResponse = [{street: street, counter: 1, rating: 'green'}];
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


var findBoxCrimesByLine = function(directions, callback) {
  var asyncNumCrimes = directions.map((street) => {
    return new Promise((res, rej) => {
      dbGeo.findBoxCrimesByLine(street, function(err, crimes) {
        if (err) {
          rej(err);
        } else {
          res(crimes.length);
        }
      });
    });
  });
  Promise.all(asyncNumCrimes).then(callback);
};

var findCrimesByLine = function(directions, callback) {
  var asyncNumCrimes = directions.map((street) => {
    return new Promise((res, rej) => {
      dbCrime.findCrimesByLine(street, function(err, crimes) {
        if (err) {
          console.error(err);
          rej(err);
        } else {
          res(crimes.length);
        }
      });
    });
  });
  Promise.all(asyncNumCrimes).then(callback);
};

var findAllBoxes = function(callback) {
  dbGeo.findAllBoxes(function(results) {
    callback(results);
  })
};

var findAllCrimes = function(callback) {
  dbCrime.findAll(function(err, results) {
    callback(results);
  });
};

module.exports.getCrimeLocs = getCrimeLocs;
module.exports.convertDirectionsToStreet = convertDirectionsToStreet;
module.exports.findAllBoxes = findAllBoxes;
module.exports.findBoxCrimesByLine = findBoxCrimesByLine;
module.exports.findAllCrimes = findAllCrimes;
module.exports.findCrimesByLine = findCrimesByLine;