let request = require('request');
let db = require('../models/rating.js');
let crime = require('../models/crime');
let LOC_API_KEY = require('../locationIQConfig.js');

let updateCrimeCounter = (lat, lng) => {
  let url = `http://locationiq.org/v1/reverse.php?format=json&key=${LOC_API_KEY}&lat=${lat}&lon=${lng}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      if (JSON.parse(body).address) {
        let street = JSON.parse(body).address.road;
        return db.findRatingEntry(street)
          .then((results) => {
            if (results.length < 1) {
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
crime.findAll((err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log('results', results);
    for (let i = 0; i < 1000; i++) {
      ((i) => {
        setTimeout(() => {
          updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
        }, 1000 * i);
      })(i);
    }
  }
});
