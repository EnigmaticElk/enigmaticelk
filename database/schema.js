var mongoose = require('mongoose');

var crimeSchema = mongoose.Schema({
  address: String,
  category: String,
  date: String,
  dayofweek: String
  descript: String,
  incidentnum: Number,
  time: String,
  x: Number,
  y: Number,
});


module.exports.Crime = mongoose.model('Crime', crimeSchema);


