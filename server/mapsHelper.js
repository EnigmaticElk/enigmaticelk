var request = require('request');
var db = require('../models/crime');

var getLatLng = function(address, callback) {
  address = address.replace(/ /g,"+");
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCNnBd6iXMKgGeHXV8_ctlXpgdNMUXQKyk`
  request(url, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(body).results[0].geometry.location);
    }
  });
}


<<<<<<< HEAD
module.exports = getLatLng;
=======
module.exports = getPosition;

