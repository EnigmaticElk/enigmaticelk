var mongoose = require("mongoose");
var expect = require('chai').expect;

var Crime = require("../database/models/Crime");
var crime = require('../server/models/crime');
mongoose.connect('mongodb://localhost/testing');

describe("Crimes", function() {
  var currentCrime = null;  

  beforeEach(function(done){
    Crime.remove({}, () => {
    }); 

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
          -122.40874329999997, 37.7834842
        ],
      },
      box: {
        type: "Polygon",
        coordinates: [[
          [-122.40888329999996, 37.7835242],
          [-122.40880329999997, 37.7835242],
          [-122.40880329999997, 37.7834442],
          [-122.40888329999996, 37.7834442],
          [-122.40888329999996, 37.7835242],
        ]]
      },
      index: "box"
    }, (err, crime) => {
      if (err) {
        console.error(err);
      } else {
      currentCrime = crime;
      done();
      }
    });
  });  

  afterEach(function(done){    
    Crime.remove({}, function() {      
      done();    
    });  
  });

  it('creates a new Crime instance in the database', function(done) {
    Crime.find({}, (err, crimes) => {
      expect(crimes).to.exist;
      done();
    });
  });

  it('only adds one crime into the database if given only one crime', (done) => {
    Crime.find({}, (err, crimes) => {
      expect(crimes.length).to.be.eql(1);
      done();
    });
  });

  it('the crime instance is represented as both locations and boxes', (done) => {
    Crime.find({}, (err, crimes) => {
      expect(crimes[0].location).to.exist;
      expect(crimes[0].box).to.exist;
      done();
    });
  });

  it('should not throw an error when adding crimes to the database', (done) => {
    Crime.find({}, (err, crimes) => {
      expect(err).to.equal(null)
      done();
    });
  });

  it('creates a new Crime instance in the database', (done) => {
    Crime.find({}, (err, crimes) => {
      expect(crimes).to.exist;
      done();
    });
  });

  it('find a crime if it is on the street', (done) => {
    let marketStreet = [[-122.403377, 37.787719], [-122.414781, 37.778749]]; //from 3rd 8th St.
    crime.findCrimeByLine(marketStreet)
          .then((crimesOnStreet) => {
            console.log('crimesOnStreet', crimesOnStreet);
            expect(crimesOnStreet).to.exist;
            expect(crimesOnStreet.length).to.eql(1);
            done();
          });
  });

  it('should not find a crime if it is not on the street', (done) => {
    let minnaSt = [[-122.411966, 37.780032], [-122.407473, 37.783583]]; //from 3rd 8th St.
    crime.findCrimeByLine(minnaSt)
          .then((crimesOnStreet) => {
            expect(crimesOnStreet).to.exist;
            expect(crimesOnStreet[0]).to.not.exist;
            done();
          });
  });



});