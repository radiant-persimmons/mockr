/*jshint -W079 */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Helpers
var paths = require('../../../../../../paths.json');

// Dependencies
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var passportStub = require('passport-stub');

/**
 * Spy/stub/mock routes **before** initializing app.
 * See http://bit.ly/1MWo3rY for an explanation of why.
 */
var route = require(paths.server.root + '/api/user/userController');
sinon.spy(route, 'getCurrentUser');

/**
 * Because we're not resetting the spy after each test,
 * we'll manually track the call count.
 */
var callCount = 0;

// Initialize app/server
var app = require(paths.server.root + '/index.js');

// Stub passport
passportStub.install(app);

// Indicate the route you're checking, if one
describe('INTEGRATION: user routes', function() {

  /**
   * restore original functionality on spied method
   * only do this for last set of tests in this file.
   */
  after(function() {
    route.getCurrentUser.restore();
  });

  describe('/api/user', function() {
    /**
     * mocha tests here will need to be asynchronous to allow server to process.
     * As such, insert a callback in the `it` block to indicate when you're done
     * with the test.
     *
     * Subsequent references to the route should be relative to your base route.
     * In this case, `/` would mean `/api/user`. If one wrote `/persons`, that
     * would correspond to `/api/user/persons`.
     */
    it('GET / should call method #getCurrentUser', function(done) {
      /**
       * use `supertest` module (called `request` here) to fake incoming calls
       * to the server. You can do a lot of checking on it, e.g. with `.expect()`.
       * Read through docs or look through here and Archivr tests
       * to get an idea of what is possible.
       */
      request(app).get('/api/user')
        .end(function(err, res) {
          // pass back error to callback if error occurred
          if (err) return done(err);
          // run the test...
          expect(route.getCurrentUser.called).to.equal(true);
          // indicate you're done with this block
          done();
        });
    });

    it('GET / should return a logged in user', function(done) {
      // method to fake a login to `passport-stub`
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


});
