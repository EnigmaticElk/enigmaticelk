let db = require('../../database/index');
let Crime = require('../../database/models/Crime');

let storeOpenData = (crimeData, callback) => {

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

let clearDatabase = (callback) => {
  Crime.remove({}, function(err) {
    callback();
  });
};

let findAll = (callback) => {
  Crime.find({}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

let findLocations = (callback) => {
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
module.exports.findAll = findAll;
module.exports.findLocations = findLocations;