var db = require('./models/crime');

var crimeLocs = function (callback) {
  db.findLocations(function(results) {
    callback(results);
  });
};

module.exports.crimeLocs = crimeLocs;

/*
The following are functions used when trying to query for point
intersections with each line for a given set of directions.
Didn't return any results.

var nearbyCrimes = function (pointOfInterest, callback) {
  var pointOfInterest = pointOfInterest || [-122.431297, 37.773972];
  db.findNearbyCrimes(pointOfInterest, function(results) {
    callback(results);
  });
};

module.exports.nearbyCrimes = nearbyCrimes;


var findCrimesByLine = function (directions, callback) {
  db.findCrimesByLine(directions, function(crimesByStreet) {
    callback(crimesByStreet.length);
  });
};

module.exports.findCrimesByLine = findCrimesByLine;

var findAll = function(callback) {
  db.findAll(function(results) {
    callback(results);
  })
}
module.exports.findAll = findAll;

*/