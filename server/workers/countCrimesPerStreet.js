var request = require('request');
var db = require('../models/rating.js');
var crime = require('../models/crime');
var LOC_API_KEY = require('../locationIQConfig.js');

let updateCrimeCounter = function(lat, lng) {
  let url =  `http://locationiq.org/v1/reverse.php?format=json&key=${LOC_API_KEY}&lat=${lat}&lon=${lng}`;
  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      if (JSON.parse(body).address) {
        let street = JSON.parse(body).address.road;
        return db.findRatingEntry(street)
          .then((results) => {
            if (results1.length < 1) {
              db.createRatingEntry(street)
                .then(() => {
                  console.log('created new entry');
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              db.updateRatingEntry(street, results)
                .then((results) => {
                  console.log('increased entry\'s crime count');
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log('API connection error');
      }
    }
  });
};

// counts crimes on each street
crime.findAll(function(err, results) {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < 5000; i++) {
      (function(i) {
        setTimeout(function() {
          updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
        }, 1000 * i);
      })(i);
    }
  }
});
