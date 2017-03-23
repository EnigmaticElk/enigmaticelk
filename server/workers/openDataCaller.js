var request = require('request');
var db = require('../models/crime');
var dbBox = require('../models/boxCrime');

var requestQuery =
'https://data.sfgov.org/resource/9v2m-8wqu.json?\
$where=\
category!="NON-CRIMINAL" AND \
category!="BAD CHECKS" AND \
category!="BRIBERY" AND \
category!="FORGERY/COUNTERFEITING" AND \
category!="FRAUD"&$limit=12000';

request(requestQuery, function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    var results = JSON.parse(body);
    db.clearDatabase(function(err) {
      db.storeOpenData(results, function(err) {
        if (err) {
          console.error(err);
        } else {
          dbBox.clearBoxDatabase(function(err) {
            dbBox.storeOpenDataInBoxes(results, function(err) {
              if (err) {
                console.error(err);
              }
            });
          });
        }
      });
    });
          console.log('length result from api call', results.length);
  }
});

