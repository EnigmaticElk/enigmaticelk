var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});