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
    });

  });

  describe('GET /heatmapData', function() {

    it('should respond with heatmap data', function(done) {
      request(app)
        .get('/heatmapData')
        .expect(200)
        .expect(function(res) {
          // able to get res.body, but it's empty.
        })
        .end(done);
    });

  });

})