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
          crime.location.longitude, crime.location.latitude
        ]
      }
    }, function (err, crime) {
      if (err) {
        callback(err);
      }
    });
  });
}

module.exports.storeOpenData = storeOpenData;




var findAll = (callback) => {
    Crime.find({}, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  });
}

module.exports.findAll = findAll;

