var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
  street: String, 
  counter: Number, 
  rating: String
});

module.exports = mongoose.model('Rating', ratingSchema);