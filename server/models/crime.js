var db = require('../../database/index').db;
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
      location: {
        type: "Point",
        coordinates: [
          crime.location.latitude, crime.location.longitude
        ]
      }
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
      console.error(err);
    } else {
      callback(results);
    }
  });
};

var findLocations = (callback) => {
  Crime.find({}, 'location.coordinates -_id', function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  });
};

module.exports.storeOpenData = storeOpenData;
module.exports.clearDatabase = clearDatabase;
module.exports.findLocations = findLocations;
module.exports.findAll = findAll;