var mongoose = require('mongoose');

var uriString = process.env.MONGOLAB_URI || 'mongodb://localhost/sfcrime';

mongoose.connect(uriString, (err, res) => {
  if (err) {
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString);
  }
});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;