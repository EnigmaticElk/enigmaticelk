let request = require('request');
let db = require('../models/crime');

let requestQuery =
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
    let results = JSON.parse(body);
    return db.clearDatabase()
      .then(() => {
        db.storeOpenData(results);
      })
      .catch((err) => {
        console.error(err);
      });
    }
});

