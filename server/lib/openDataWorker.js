var request = require('request');
var mongoose = require('mongoose');
var schema = require('../../database/schema.js');

var storeResponseData = function(body) {
  for (var i = 0; i < body.length; i++) {
    var crimeEntry = new schema.Crime({
      address: body[i].address,
      category: body[i].category,
      date: body[i].date, 
      dayofweek: body[i].dayofweek, 
      descript: body[i].descript, 
      incidentnum: body[i].incidentnum,
      time: body[i].time,
      x: body[i].x,
      y: body[i].y,
      loc: {
        type: 'Point', 
        coordinates: [body[i].x, body[i].y]
      }
    });
    crimeEntry.save(function(err, item) {
      if (err) {
        console.log(err);
      } else {
        console.log('added crimeEntry to db');
      }
    });
  }
};

module.exports = request('https://data.sfgov.org/resource/cuks-n6tp.json', function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    console.log(body[0]);
    storeResponseData(body)
    .then();
  }
}); 

