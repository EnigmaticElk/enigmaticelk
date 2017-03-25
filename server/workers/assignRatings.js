let db = require('../models/rating.js');

let assign = function(street, rating) {
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
    for (let i = 0; i < results1.length; i++) {
      if (results1[i].counter > 19) {
        assign(results1[i].street, 'red');
      } else if (results1[i].counter > 9) {
        assign(results1[i].street, 'yellow');
      } else {
        assign(results1[i].street, 'green');
      }
    }
  })
  .catch((err) {
    console.log(err);
  });
});
