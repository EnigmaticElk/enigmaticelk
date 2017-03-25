let db = require('../../database/index');
let Rating = require('../../database/models/Rating');

let findRatingEntry = (street) => {
  return new Promise((res, rej) => {
    Rating.find({street: street}, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

let updateRatingEntry = function(street, entry) {
  return new Promise((res, rej) => {
    Rating.findOneAndUpdate({street: street}, {$set:{counter:(entry[0].counter + 1)}}, {new: true}, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

let createRatingEntry = function(street) {
  return new Promise((res, rej) => {
    Rating.create({street: street, counter: 1, rating: 'green'}, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

let findAllRatings = () => {
  return new Promise((res, rej) => {
    Rating.find({}, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

let assignOneRating = function(street, rating) {
  return new Promise((res, rej) => {
    Rating.findOneAndUpdate({street: street}, {$set:{rating: rating}}, {new: true}, function(err, results) {
      if (err) {
        rej(err, null);
      } else {
        res(null, results);
      }
    });
  });
}

module.exports.findRatingEntry = findRatingEntry;
module.exports.updateRatingEntry = updateRatingEntry;
module.exports.createRatingEntry = createRatingEntry;
module.exports.findAllRatings = findAllRatings;
module.exports.assignOneRating = assignOneRating;
