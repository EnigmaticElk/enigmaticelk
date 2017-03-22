var db = require('./models/crime');
var dbBox = require('./models/boxCrime');
// var Promise = require("bluebird");


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


var findCrimesByLine = function (directions, callback) {
  console.log('crimes by line, not boxes');
  db.findCrimesByLine(directions, function(crimesByStreet) {
    callback(crimesByStreet.length);
  });
};

module.exports.findCrimesByLine = findCrimesByLine;

var findBoxCrimesByLine = function (directions, callback) {
  var asynNumCrimes = directions.map((street) => {
    return new Promise((res, rej) => {
      dbBox.findBoxCrimesByLine(street, function(crimes) {
        res(crimes.length);
      });
    });
  });
  Promise.all(asynNumCrimes).then(callback);
};

module.exports.findBoxCrimesByLine = findBoxCrimesByLine;

var findAllBoxes = function(callback) {
  var total = 0;
  dbBox.findAllBoxes(function(results) {

    callback(results);
  })
}
module.exports.findAllBoxes = findAllBoxes;

var findAll = function(callback) {
  db.findAll(function(results) {
    callback(results);
  })
}
module.exports.findAll = findAll;