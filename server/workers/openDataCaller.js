var request = require('request');
var db = require('../models/crime');

var requestQuery =
'https://data.sfgov.org/resource/9v2m-8wqu.json?\
$where=\
category!="NON-CRIMINAL" AND \
category!="BAD CHECKS" AND \
category!="BRIBERY" AND \
category!="FORGERY/COUNTERFEITING" AND \
category!="FRAUD"&$limit=10000';

request(requestQuery, (err, res, body) => {
  if (err) {
    console.log(err);
  } else {
    var results = JSON.parse(body);
    return db.clearDatabase()
      .then(() => {
        db.storeOpenData(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

