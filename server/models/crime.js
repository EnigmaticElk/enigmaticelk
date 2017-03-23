var db = require('../../database/index').db;
var Crime = require('../../database/models/Crime');

var storeOpenData = (crimeData) => {

  var asyncStore = crimeData.forEach((crime) => {
    return new Promise((res, rej) => {
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
            crime.location.longitude - 0, crime.location.latitude -0
          ]
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
  Promise.all(asyncStore);
}

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
  Crime.find({}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
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

//trying to make $geoIntersection
var findNearbyCrimes = (pointOfInterest, callback) => {
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
      console.error(err);
    } else {
      callback(results);
    }
  });
}

var findCrimesByLine = (streets, callback) => {
  streets.forEach(function(startEndLongLat) {
    Crime.find({
      location: {
        $geoIntersects: {
          $geometry: {
            type: "LineString",
            coordinates: startEndLongLat,
          }
        }
      }
    }, function (err, results) {
      if (err) {
        console.error(err);
      } else {
        callback(results);
      }
    });
  })
}


module.exports.storeOpenData = storeOpenData;
module.exports.clearDatabase = clearDatabase;
module.exports.findLocations = findLocations;
module.exports.findAll = findAll;
module.exports.findNearbyCrimes = findNearbyCrimes;
module.exports.findCrimesByLine = findCrimesByLine;
