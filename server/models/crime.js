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




// as of right now, only being used to verify results from API call
var findAll = () => {
    Crime.find({}, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(results)
      return results;
    }
  });
}

module.exports.findAll = findAll;


var findLocs = (callback) => {
  Crime.find({}, function( err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  });
}
module.exports.findLocs = findLocs;