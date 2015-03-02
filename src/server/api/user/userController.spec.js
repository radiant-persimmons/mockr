/*jshint -W079 */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var passportStub = require('passport-stub');
var controller = require('./userController')

describe('UNIT: userController.js', function() {

  describe('#getCurrentUser', function() {
    var req;
    var res;
    var jsonStub;

    // set up stubs on req and res
    beforeEach(function() {
      req = { user: 'Andrew' };
      jsonStub = sinon.stub();
      res = { status: sinon.stub().returns({ json: jsonStub }) };
    });

    it('should return status 200 with json object `req.user`', function() {
      controller.getCurrentUser(req, res);

      expect(jsonStub.calledWith(req.user));
    });
  });
});
