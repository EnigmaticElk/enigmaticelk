var db = require('../../database/index');
var Crime = require('../../database/models/Crime');

var storeOpenData = (crimeData, callback) => {

  crimeData.forEach((crime) => {
    Crime.create({
      address: crime.address,
      category: crime.category,
      date: crime.date,
      dayofweek: crime.dayofweek,
      descript: crime.descript,
      incidntnum: crime.incidntnum,
      loc: {
        type: "Point",
        coordinates: [
          crime.location.latitude, crime.location.longitude
        ]
      },
      index: ""
    }, function (err, crime) {
      if (err) {
        callback(err);
      }
    });
  });
}

var clearDatabase = (callback) => {
  Crime.remove({}, function(err) {
    callback();
  });
};

var findAll = (callback) => {
  Crime.find({}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var findLocations = (callback) => {
  Crime.find({}, 'loc.coordinates -_id', function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  });
};

module.exports.storeOpenData = storeOpenData;
module.exports.clearDatabase = clearDatabase;
module.exports.findAll = findAll;
module.exports.findLocations = findLocations;