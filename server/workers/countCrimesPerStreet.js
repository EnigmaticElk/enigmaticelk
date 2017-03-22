var request = require('request');
var db = require('../models/rating.js');
var crime = require('../models/crime');
var API_KEY = require('../googleMapsConfig.js');

var updateCrimeCounter = function(lat, lng) {
  var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      var street = JSON.parse(body).results[0].address_components[1].long_name;
      db.findRatingEntry(street, function(err1, results1) {
        if (err1) {
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
      });
    }
  });
};

// counts crimes on each street
crime.findAll(function(err, results) {
  if (err) {
    console.log(err);
  } else {
    for (var i = 0; i < 10; i++) {
      (function(i) {
        setTimeout(function() {
          updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
        }, 20 * i);
      })(i);
    }
  }
});
