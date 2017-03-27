let ratingInfo = {
  high: {
    desc: 'Risky',
    minNum: 10,
    color: 'red',
  },
  moderate: {
    desc: 'Sketchy',
    minNum: 5,
    color: 'yellow',
  },
  safe: {
    desc: 'Safe',
    minNum: 0,
    color: 'green',
    maxNum: 5,
  },
};

module.exports.ratingInfo = ratingInfo;


const calcRating = (streetLength, numCrimes) => {
  let crimePerkM = (numCrimes / streetLength) / 1000;
  if (crimePerkM >= ratingInfo.high.minNum) {
    return ratingInfo.high.color;
  } else if (crimePerkM >= ratingInfo.moderate.minNum) {
    return ratingInfo.moderate.color;
  } else {
    return ratingInfo.safe.color;
  }
};

module.exports.calcRating = calcRating;