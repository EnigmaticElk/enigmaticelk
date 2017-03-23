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
category!="FRAUD"&$limit=30000';

request(requestQuery, function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    var results = JSON.parse(body);
    console.log(results[0]);
    db.clearDatabase()
      .then(() => {
        db.storeOpenData(results);
      })
      .then(() => {
      dbBox.clearBoxDatabase();
      })
      .then(() => {
        dbBox.storeOpenDataInBoxes(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

