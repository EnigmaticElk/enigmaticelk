var db = require('../models/crime');

var crimeLocs = db.findLocs(function(results) {
  return results.map(function(crime) {
    return crime.location.coordinates
  });
})

module.exports = crimeLocs;