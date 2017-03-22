var db = require('../../database/index').db;
var Rating = require('../../database/models/Rating');

var findRatingEntry = function(street, callback) {
  Rating.find({street: street}, function(err, results) {
    if (results.length < 1) {
    // if street isn't found an empty array is returned, not an error, so to make the callback work an empty array is treated as if it were an error
      err = results;
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var updateRatingEntry = function(street, entry, callback) {
  Rating.findOneAndUpdate({street: street}, {$set:{counter:(entry[0].counter + 1)}}, {new: true}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

var createRatingEntry = function(street, callback) {
  Rating.create({street: street, counter: 1, rating: 'green'}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var findAllRatings = (callback) => {
  Rating.find({}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var assignOneRating = function(street, rating, callback) {
  Rating.findOneAndUpdate({street: street}, {$set:{rating: rating}}, {new: true}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.findRatingEntry = findRatingEntry;
module.exports.updateRatingEntry = updateRatingEntry;
module.exports.createRatingEntry = createRatingEntry;
module.exports.findAllRatings = findAllRatings;
module.exports.assignOneRating = assignOneRating;
