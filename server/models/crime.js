var db = require('../../database/index');
var Crime = require('../../database/models/Crime');

var storeOpenData = (crimeData, callback) => {
  console.log('I am alive inside storingdata');
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
          crime.location.longitude - 0, crime.location.latitude -0
        ]
      },
      index: "location"
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
