var mongoose = require('mongoose');

var crimeSchema = new mongoose.Schema({
  address: String,
  category: String,
  date: String,
  dayofweek: String,
  descript: String,
  incidntnum: {
    type: Number,
    index: { unique: true }
  },
  time: String,
  location: {
    type: Object,
    coordinates: []
  },
  box: {
    type: Object,
    coordinates: []
  },
});

crimeSchema.index({box: "2dsphere"});
crimeSchema.index({location: "2dsphere"});

module.exports= mongoose.model('Crime', crimeSchema);