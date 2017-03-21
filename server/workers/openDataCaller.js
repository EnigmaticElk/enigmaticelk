var request = require('request');
var path = require('path');
var db = require('../models/crime');

var requestQuery =
'https://data.sfgov.org/resource/9v2m-8wqu.json?\
$where=\
category!="NON-CRIMINAL" AND \
category!="BAD CHECKS" AND \
category!="BRIBERY" AND \
category!="FORGERY/COUNTERFEITING" AND \
category!="FRAUD"&$limit=30000';

request(requestQuery, function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    db.clearDatabase(function(err) {
      var results = JSON.parse(body);
      db.storeOpenData(results, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }
});

