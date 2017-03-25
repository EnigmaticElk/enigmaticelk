let mongoose = require('mongoose');

let ratingSchema = new mongoose.Schema({
  street: String, 
  counter: Number, 
  rating: String
});

module.exports = mongoose.model('Rating', ratingSchema);