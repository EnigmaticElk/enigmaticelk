var db = require('../../database/index').db;
var Rating = require('../../database/models/Rating');

var clearCollection = function(callback) {
  Rating.remove({}, function(err) {
    callback();
  });
};

var findRatingEntry = function(street, callback) {
  Rating.find({street, street}, function(err, results) {
    // if street isn't found an empty array is returned, not an error, so to make the callback work an empty array is treated as if it were an error
    if (results.length < 1) {
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
  Rating.create({street: street, counter: 1, rating: 'rating has not been set'}, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.findRatingEntry = findRatingEntry;
module.exports.updateRatingEntry = updateRatingEntry;
module.exports.createRatingEntry = createRatingEntry;
