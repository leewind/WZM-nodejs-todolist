var request = require('supertest');
var app = require('../../app');
var chai = require('chai');
var expect = chai.expect;

describe('RESTFUL接口测试 -- create接口', function () {
  it('创建todo内容', function (done) {
    request(app)
      .post('/todo/')
      .send({'username': 'peter', 'content': 'rose', 'level': 'high'})
      .expect(200)
      .end(function (err, res) {
          if (err) throw done(err);
          var data = JSON.parse(res.text)
          expect(data.id).to.be.a('number');
          done();
        })
  })
});