var request = require('request');
var path = require('path');


request('https://data.sfgov.org/resource/9v2m-8wqu.json', function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    var results = JSON.parse(body);
    // call function to store results to database here
  }
});
