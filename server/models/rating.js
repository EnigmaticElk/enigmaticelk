var db = require('../../database/index').db;
var Rating = require('../../database/models/Rating');

var clearCollection = (callback) => {
  Rating.remove({}, function(err) {
    callback();
  });
};

var findRatingEntry = function(street, callback) {
  Rating.find({street, street}, function(err, results) {
    if (err1) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var updateRatingEntry = function(street, callback) {
  Rating.findOneAndUpdate({street: street}, {$set:{counter:(results1[0].counter + 1)}}, {new: true}, function(err, results) {
    if (err2) {
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
