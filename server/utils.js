let dbCrime = require('./models/crime.js');
let dbRating = require('./models/rating.js');
let request = require('request');
let GOOGLE_API_KEY = require('./googleMapsConfig.js');

let getCrimeLocs = dbCrime.findLocations;

let assignStreetFromLngLat = (lng, lat) => {
  return new Promise((response, rej) => {
    let url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    request(url, (err, res, body) => {
      if (err) {
        rej(err);
      } else {
        let street = JSON.parse(body).results[0].address_components[1].long_name;
        return dbRating.findRatingEntry(street)
          .then((results) => {
            if (results.length < 1) {
              let defaultResponse = [{street: street, counter: 0, rating: 'green'}];
              response(defaultResponse);
            } else {
              response(results);
            }
          })
          .catch((err) => {
            rej(err);
          });
        }
    });
  });
};



let findCrimesByLine = (directions) => {
  let asyncNumCrimes = directions.map((street) => {
    return new Promise((res, rej) => {
      dbCrime.findCrimeByLine(street)
        .then((crimes, err) => {
          if (err) {
            rej(err);
          }
          let stInfo = {};
          stInfo.counter = crimes.length;
          
          if (crimes.length > 20) {
            stInfo.rating = 'red';           
          } else if (crimes.length > 10) {
            stInfo.rating = 'yellow';
          } else {
            stInfo.rating = 'green';
          }
          let line = [street[1], street[0], stInfo];
          res(line);
        });
    });
  });
  return Promise.all(asyncNumCrimes);
};


let findAllCrimes = dbCrime.findAll;


let convertDirectionsToStreet = (req) => {
  return new Promise((res, rej) => {
    let coordsWithAddresses = req.body.streets;
    let counter = 0;
    for (let i = 0; i < req.body.streets.length; i++) {
      ((i) => {
        setTimeout(() => {
          assignStreetFromLngLat(req.body.streets[i][0][0], req.body.streets[i][0][1])
            .then((results) => {
              coordsWithAddresses[i].push(results[0]);
              counter++;
              if (counter === req.body.streets.length) {
                res(coordsWithAddresses);
              }
            })
            .catch((err) => {
              rej(err);
            });
        }, 20 * i);
      })(i);
    }
  });
};

module.exports.getCrimeLocs = getCrimeLocs;
module.exports.convertDirectionsToStreet = convertDirectionsToStreet;
module.exports.findAllCrimes = findAllCrimes;
module.exports.findCrimesByLine = findCrimesByLine;
