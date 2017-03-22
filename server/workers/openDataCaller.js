var request = require('request');
var db = require('../models/crime');
var dbBox = require('../models/boxCrime');
console.log('in open caller')

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
        } else {
          dbBox.clearBoxDatabase(function(err) {
            dbBox.storeOpenDataInBoxes(results, function(err) {
              console.log('stored data in boxes')
              if (err) {
                console.error(err);
              }
            });
          });
        }
      });
    });
  }
});

