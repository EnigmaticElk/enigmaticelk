var request = require('request');
var db = require('../models/rating.js');
var crime = require('../models/crime');
var LOC_API_KEY = require('../locationIQConfig.js');

var updateCrimeCounter = function(lat, lng) {
  var url =  `http://locationiq.org/v1/reverse.php?format=json&key=${LOC_API_KEY}&lat=${lat}&lon=${lng}`;
  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      if (JSON.parse(body).address) {
        var street = JSON.parse(body).address.road;
        db.findRatingEntry(street, function(err1, results1) {
          if (err1) {
            console.log(err1);
          } else {
            if (results1.length < 1) {
              db.createRatingEntry(street, function(err2, results2) {
                if (err2) {
                  console.log(err2);
                } else {
                  console.log('created new entry');
                }
              });
            } else {
              db.updateRatingEntry(street, results1, function(err3, results3) {
                if (err3) {
                  console.log(err3);
                } else {
                  console.log('increased entry\'s crime count');
                }
              });
            }
          }
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
    for (var i = 0; i < 10000; i++) {
      (function(i) {
        setTimeout(function() {
          updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
        }, 1000 * i);
      })(i);
    }
  }
});
