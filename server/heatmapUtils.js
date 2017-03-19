var db = require('./models/crime');

var crimeLocs = function (callback) {
  db.findLocations(function(results) {
    callback(results);
  });
};

module.exports = crimeLocs;