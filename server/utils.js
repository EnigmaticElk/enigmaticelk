let dbCrime = require('./models/crime.js');
let dbRating = require('./models/rating.js');
let request = require('request');
let GOOGLE_API_KEY = require('./googleMapsConfig.js');

let getCrimeLocs = function (callback) {
  dbCrime.findLocations(function(results) {
    callback(results);
  });
};

let assignStreetFromLngLat = (lng, lat) => {
  return new Promise((response, rej) => {
    let url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    request(url, function(err, res, body) {
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


let convertDirectionsToStreet = function(req) {
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
}

module.exports.getCrimeLocs = getCrimeLocs;
module.exports.convertDirectionsToStreet = convertDirectionsToStreet;
