let db = require('../models/rating.js');

let assign = (street, rating) => {
  db.assignOneRating(street, rating)
    .then((results) => {
      console.log('assigned rating');
    })
    .catch((err) => {
      console.log(err);
  });  
};

// assigns ratings to streets
db.findAllRatings()
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      if (results[i].counter > 19) {
        assign(results[i].street, 'red');
      } else if (results[i].counter > 9) {
        assign(results[i].street, 'yellow');
      } else {
        assign(results[i].street, 'green');
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });

