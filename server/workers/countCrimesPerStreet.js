var request = require('request');
var db = require('../models/rating.js');
var crime = require('../models/crime');

var updateCrimeCounter = function(lat, lng) {
  //var url =  `http://locationiq.org/v1/reverse.php?format=json&key=6bc67043075bb2c0f0b3&lat=${lat}&lon=${lng}`;
  var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA3j_oiWaOl_WTRllB88q3KMq4tLGufcOs`;
  //var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=37.7868476,-122.41236300000003&key=AIzaSyCeRlYlmITEn4ItFmhN48Yo0IPR_88E_u4`;

  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      //console.log('here: ', JSON.parse(body).results[0].address_components[1].long_name);
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
    for (var i = 0; i < 0; i++) {
      (function(i) {
        setTimeout(function() {
          updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
        }, 20 * i);
      })(i);
    }
  }
});
