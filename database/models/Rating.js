var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
  address: String, 
  counter: Number, 
  label: String
});

module.exports = mongoose.model('Crime', crimeSchema);