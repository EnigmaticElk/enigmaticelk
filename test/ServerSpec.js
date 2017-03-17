var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = require('../server/server.js');

describe('Server', function() {

  describe('GET /', function() {
    it('should respond to GET requests', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    })
  })

  describe('POST /search', function() {
    it('should respond to POST requests', function(done) {
      request(app)
        .post('/search')
        .send({
          address: '123 main street'
        })
        .expect(200)
        .end(done);
    })

    it('should send coordinates when sent an address', function(done) {
      request(app)
        .post('/search')
        .send({
          address: '123 main street'
        })
        .expect(function(res) {
          expect(res.body).to.be.an('object')
          expect(res.body.lat).to.be.a('number')
        })
        .end(done);
    })
    
  })

})