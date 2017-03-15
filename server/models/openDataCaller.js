var request = require('request');
var path = require('path');
var db = require('../../database/queries');

request('https://data.sfgov.org/resource/9v2m-8wqu.json', function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    var results = JSON.parse(body);
    db.storeOpenData(results, function(err) {
      if (err) {
        console.error(err);
      }
    })
  }
});

// quick test to show all results
// setTimeout(db.findAll, 5000);
