var mongoose = require("mongoose");
var expect = require('chai').expect;

var Crime = require("../database/models/Crime");
mongoose.connect('mongodb://localhost/testing');

describe("Crimes", function() {
  var currentCrime = null;  

  beforeEach(function(done){    
    Crime.create({
      address: '944 Market Street',
      category: 'ASSAULT',
      date: '03/21/2017',
      dayofweek: 'Tuesday',
      descript: 'TEST',
      incidntnum: 1234567890,
      location: {
        type: "Point",
        coordinates: [
          -122.44, 37.76
        ]
      }
    }, function (err, crime) {
      currentCrime = crime;
      done();
    });
  });  

  afterEach(function(done){    
    Crime.remove({}, function() {      
      done();    
    });  
  });

  it('creates a new Crime instance in the database', function(done) {
    Crime.create({
      address: '944 Market Street',
      category: 'DRUG/NARCOTIC',
      date: '03/21/2017',
      dayofweek: 'Tuesday',
      descript: 'TEST',
      incidntnum: 1234567890,
      location: {
        type: "Point",
        coordinates: [
          -122.55, 37.66
        ]
      }
    }, function (err, crime) {
      expect(crime).to.exist;
      expect(crime.location).to.exist;
      expect(err).to.equal(null);
      done();
    });
  });

});