/*jshint -W079 */

// Set environment to test
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var passportStub = require('passport-stub');

// Spy on route **before** initializing app
var route = require('../../server/api/user/userController');
sinon.spy(route, 'getCurrentUser');

// Initialize app
var app = require('../../server/index.js');

// Stub passport
passportStub.install(app);

describe('UNIT: /api/user', function() {

  /**
   * restore original functionality on spied method
   * only do this for last set of tests in this file
   */
  after(function() {
    route.getCurrentUser.restore();
  });

  it('GET / should call method #getCurrentUser', function(done) {
    request(app).get('/api/user')
      .end(function(err, res) {
        if (err) return done(err);
        expect(route.getCurrentUser.called).to.equal(true);
        done();
      });
  });

  it('GET / should return a logged in user', function(done) {
    passportStub.login({ username: 'AndrewSouthpaw' });
    request(app).get('/api/user')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.eql({ username: 'AndrewSouthpaw' });
        done();
      });
  });

  it('GET / should return undefined for not logged in user', function(done) {
    request(app).get('/api/user')
      .expect(200, done);
  });

});
