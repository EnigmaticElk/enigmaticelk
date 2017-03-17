var db = require('./models/crime');

var getCrimeLocs = function(callback) {
  db.findLocations(function(results) {
    callback(results);
  });
};

module.exports = getCrimeLocs;