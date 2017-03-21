var mongoose = require('mongoose');

var crimeSchema = new mongoose.Schema({
  address: String,
  category: String,
  date: String,
  dayofweek: String,
  descript: String,
  incidntnum: Number,
  time: String,
  location: {
    type: Object,
    coordinates: [
      Number, Number
    ]
  }
});

crimeSchema.index({location: "2dsphere"})

module.exports = mongoose.model('Crime', crimeSchema);


