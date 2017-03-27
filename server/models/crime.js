let db = require('../../database/index');
let Crime = require('../../database/models/Crime');

let storeOpenData = (crimeData) => {

  let asyncStore = crimeData.map((crime) => {
    return new Promise((res, rej) => {

      let long = crime.location.longitude - 0;
      let lat = crime.location.latitude - 0;
      let mutilplier = 1000000000000;
      let boxPadding = 20000000;
      
      let coords = {
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
      }, (err, crime) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  });
  return Promise.all(asyncStore).catch((err) => {
    console.error('err in store: ', err);
  });
};

let clearDatabase = () => {
  return new Promise((res, rej) => {
    Crime.remove({}, (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};

let findAll = () => {
  return new Promise ((res, rej) => {
    Crime.find({}, (err, results) => {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};


let findLocations = () => {
  return new Promise((res, rej) => {
    Crime.find({}, 'location.coordinates -_id', (err, results) => {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

// trying to make $geoIntersection
let findNearbyCrimes = (pointOfInterest) => {
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
    }, (err, results) => {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

let findCrimeByLine = (lineLongLat) => {
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
    }, (err, results) => {
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
