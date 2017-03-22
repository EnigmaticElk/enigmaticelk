var mongoose = require('mongoose');

// console.log('inside boxCrimeSchema');

var boxCrimeSchema = new mongoose.Schema({
  address: String,
  category: String,
  date: String,
  dayofweek: String,
  descript: String,
  incidntnum: Number,
  time: String,
  location: {
    type: Object,
    coordinates: []
  },
});

boxCrimeSchema.index({location: "2dsphere"})

module.exports = mongoose.model('BoxCrime', boxCrimeSchema);