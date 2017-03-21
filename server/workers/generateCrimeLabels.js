var request = require('request');
var db = require('../models/rating.js');
var crime = require('../models/crime');

crime.findAll(function(err, results) {
  if (err) {
    console.log(err);
  } else {
    for (var i = 0; i < results.length; i++) {
      updateCrimeCounter(results[i].location.coordinates[0], results[i].location.coordinates[1]);
    }
  }
});

var updateCrimeCounter = function(lat, lng) {
  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCNnBd6iXMKgGeHXV8_ctlXpgdNMUXQKyk`;
  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      console.log('parsed-body: ', JSON.parse(body));
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
          console.log('hello');
          db.updateRatingEntry(street, results1, function(err3, results3) {
            if (err3) {
              console.log(err3);
            } else {
              console.log('updated entry');
            }
          });
        }
      });
    }
  });
}


// needs to run after openDataCaller finishes
// for each entry in the database convert the x and y coordinates into an address
  // if address doesnt exist in collection add it to colelction and initialize counter to 1
  // if address exists in db increate counter by 1
// for each street in database convert counter to a label 


// for each address passed into function (from directions)
  // initiate counter variable
  // search through entire database for street name matches (or use geoindexing)
    // if there are matches increase counter
  // if counter is greater than x assign it red
  // if counter is between x and x assign it yellow
  // if counter is less than x assign it green
  // store address and label

// take out .db from crime.js and rating.js and where it gets exported (database index.js)
// change file from above to clear database to clear collections 
//rename opendata caller and findcrime addresses to match their models in the db and server
// take out or key from requests to google, put them in a gitignore file 
//refactor to use promises

