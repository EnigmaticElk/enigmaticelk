var db = require('../../database/index').db;
var BoxCrime = require('../../database/models/BoxCrime');

var storeOpenDataInBoxes = (crimeData) => {
  console.log('alive in storeOpenDataInBoxes');
  var asyncBoxStore = crimeData.forEach((crime) => {
    return new Promise((res, rej) => {

      var long = crime.location.longitude - 0;
      var lat = crime.location.latitude - 0;
      var mutilplier = 1000000000000;
      var boxPadding = 20000000;
      
      var coords = {
        upperLeft: [(((long * mutilplier) - boxPadding) / mutilplier), (((lat * mutilplier) + boxPadding) / mutilplier)],
        upperRight: [(((long * mutilplier) + boxPadding) / mutilplier), (((lat * mutilplier) + boxPadding) / mutilplier)],
        lowerRight: [(((long * mutilplier) + boxPadding) / mutilplier), (((lat * mutilplier) - boxPadding) / mutilplier)],
        lowerLeft: [(((long * mutilplier) - boxPadding) / mutilplier), (((lat * mutilplier) - boxPadding) / mutilplier)],
      }; 

      BoxCrime.create({
        address: crime.address,
        category: crime.category,
        date: crime.date,
        dayofweek: crime.dayofweek,
        descript: crime.descript,
        incidntnum: crime.incidntnum,
        location: {
          type: "Polygon",
          coordinates: [[
            coords.upperLeft,
            coords.upperRight,
            coords.lowerRight,
            coords.lowerLeft,
            coords.upperLeft
          ]]
        },
        index: "location"
      }, function (err, crime) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  });
  Promise.all(asyncBoxStore);
};

module.exports.storeOpenDataInBoxes = storeOpenDataInBoxes;


var clearBoxDatabase = () => {
  return new Promise((res, rej) => {
    BoxCrime.remove({}, function(err) {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};

module.exports.clearBoxDatabase = clearBoxDatabase;


var findAllBoxes = (callback) => {
  BoxCrime.find({}, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      //only logging one for testing purposes
      callback(results[0]);
    }
  });
};

module.exports.findAllBoxes = findAllBoxes;


var findBoxCrimesByLine = (lineLongLat, callback) => {

  BoxCrime.find({
    location: {
      $geoIntersects: {
        $geometry: {
          type: "LineString",
          coordinates: lineLongLat,
        }
      }
    }
  }, function (err, crimes) {
    if (err) {
      console.error(err);
    } else {
      callback(crimes);
    }
  });
};

module.exports.findBoxCrimesByLine = findBoxCrimesByLine;

