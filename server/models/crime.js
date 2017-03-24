var db = require('../../database/index');
var Crime = require('../../database/models/Crime');

var storeOpenData = (crimeData) => {

  var asyncStore = crimeData.map((crime) => {
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
            long, lat
          ]
        },
        box: {
          type: "Polygon",
          coordinates: [[
            coords.upperLeft,
            coords.upperRight,
            coords.lowerRight,
            coords.lowerLeft,
            coords.upperLeft
          ]]
        },
        index: "box"
      }, function (err, crime) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  });
  Promise.all(asyncStore);
};

var clearDatabase = () => {
  return new Promise((res, rej) => {
    Crime.remove({}, function(err) {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};

var findAll = (callback) => {
  return new Promise ((res, rej) => {
    Crime.find({}, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  })
  .then(callback);
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

// trying to make $geoIntersection
var findNearbyCrimes = (pointOfInterest) => {
  return new Promise((res, rej) => {
    Crime.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: pointOfInterest
          },
          $maxDistance: 100,
        }
      }
    }, function (err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  })
  .then(callback);
};

var findCrimeByLine = (lineLongLat) => {
  return new Promise((res, rej) => {    
    Crime.find({
      box: {
        $geoIntersects: {
          $geometry: {
            type: "LineString",
            coordinates: lineLongLat,
          }
        }
      }
    }, function (err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};


module.exports.storeOpenData = storeOpenData;
module.exports.clearDatabase = clearDatabase;
module.exports.findLocations = findLocations;
module.exports.findAll = findAll;
module.exports.findNearbyCrimes = findNearbyCrimes;
module.exports.findCrimeByLine = findCrimeByLine;
