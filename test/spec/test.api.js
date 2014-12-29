var request = require('supertest');
var app = require('../../app');
var chai = require('chai');
var expect = chai.expect;

request(app)
  .get('/demo/example')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;

    console.log('end')
  });