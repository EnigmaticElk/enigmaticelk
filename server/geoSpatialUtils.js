var db = require('./models/boxCrime');

var findBoxCrimesByLine = function (directions, callback) {
  var asynNumCrimes = directions.map((street) => {
    return new Promise((res, rej) => {
      db.findBoxCrimesByLine(street, function(crimes) {
        res(crimes.length);
      });
    });
  });
  Promise.all(asynNumCrimes).then(callback);
};

module.exports.findBoxCrimesByLine = findBoxCrimesByLine;

var findAllBoxes = function(callback) {
  var total = 0;
  db.findAllBoxes(function(results) {

    callback(results);
  })
}
module.exports.findAllBoxes = findAllBoxes;