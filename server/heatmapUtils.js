var db = require('./models/crime');
var dbBox = require('./models/boxCrime');

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
  dbBox.findBoxCrimesByLine(directions, function(crimesByStreet) {
    var results = crimesByStreet.length;
    callback(results);
  });
};

module.exports.findBoxCrimesByLine = findBoxCrimesByLine;

var findAllBoxes = function(callback) {
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