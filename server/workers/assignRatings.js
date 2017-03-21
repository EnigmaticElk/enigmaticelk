var db = require('../models/rating.js');

var assign = function(street, rating) {
  db.assignOneRating(street, rating, function(err2, results2) {
    if (err2) {
      console.log(err2);
    } else {
      console.log('assigned rating');
    }
  });  
}

// assigns ratings to streets
db.findAllRatings(function(err1, results1) {
  if (err1) {
    console.log(err1);
  } else {
    for (var i = 0; i < results1.length; i++) {
      if (results1[i].counter > 2) {
        assign(results1[i].street, 'red');
      } else if (results1[i].counter > 1) {
        assign(results1[i].street, 'yellow');
      } else {
        assign(results1[i].street, 'green');
      }
    }
  }
});

