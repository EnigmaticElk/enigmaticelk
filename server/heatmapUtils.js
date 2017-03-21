var db = require('./models/crime');

var crimeLocs = function (callback) {
  db.findLocations(function(results) {
    callback(results);
  });
};

module.exports.crimeLocs = crimeLocs;

var nearbyCrimes = function (callback) {
  var pOI = [-122.431297, 37.773972];
  db.findNearbyCrimes(pOI, function(results) {
    callback(results);
  });
};

module.exports.nearbyCrimes = nearbyCrimes;