/*jshint -W079 */
/*jshint expr:true */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var mockery = require('mockery');

/**
 * Helper to unwrap and re-wrap a method with a callback.
 * @param  {object}   object Object to be stubbed
 * @param  {string}   method Method on the object to be stubbed
 * @param  {function} cb     Optional callback to be the stub
 * @return {undefined}
 */
function reloadStub(object, method, cb) {
  if (typeof object === 'undefined' || typeof method === 'undefined') {
    console.error('reloadStub expects an object and method');
  } else {
    object[method].restore();
    typeof cb === 'function' ? sinon.stub(object, method, cb)
                             : sinon.stub(object, method);
  }
}

describe('UNIT: userController.js', function() {

  var reportErrorStub;
  var controller;
  var userModel;

  before(function() {
    // mock the error reporter
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    reportErrorStub = sinon.stub();

    mockery.registerMock('../../utils/errorReporter', reportErrorStub);

    // load controller and model
    controller = require('./userController');
    userModel = require('./userModel');
  });

  afterEach(function() {
    // reset dependencies call count
    reportErrorStub.reset();
  });

  after(function() {
    // disable mock after tests complete
    mockery.disable();
  });

  describe('#createUser', function() {
    var req;
    var res;
    var status;
    var end;
    var json;

    // Stub `#save` for all these tests
    before(function() {
      sinon.stub(userModel.prototype, 'save');
    });

    // Stub out req and res
    beforeEach(function() {
      req = {
        body: {
          username: 'Andrew',
          userID: 1
        }
      };

      status = sinon.stub();
      end = sinon.stub();
      json = sinon.stub();

      res = {
        status: status.returns({ end: end, json: json })
      };
    });

    // Reset call count after each test
    afterEach(function() {
      userModel.prototype.save.reset();
    });

    // Restore after all tests finish
    after(function() {
      userModel.prototype.save.restore();
    });

    it('should call `User.save`', function(done) {
      controller.createUser(req, res);
      /**
       * Since Mongoose's `new` is asynchronous, run our expectations on the
       * next cycle of the event loop.
       */
      setTimeout(function() {
        expect(userModel.prototype.save.callCount).to.equal(1);
        done();
      }, 0);
    });

    it('should store `username` and `userID` on user', function(done) {
      var userData;

      // Special stub to reveal model data
      var stubSaveData = function(cb) {
        console.log('inside stubSaveData');
        userData = this;
      };

      // swap out old stub for the specialized one
      reloadStub(userModel.prototype, 'save', stubSaveData);

      controller.createUser(req, res);
      setTimeout(function() {
        expect(userData.username).to.equal('Andrew');
        expect(userData.userID).to.equal(1);

        // return to ordinary stub
        reloadStub(userModel.prototype, 'save');

        done();
      }, 0);
    });

    it('should run res.status(201).end() after saving is successful', function(done) {

      userModel.prototype.save.yields(null);

      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(201)).to.equal(true, 'not called with 201');
        expect(res.status().end.called).to.equal(true, 'res.status.end not called');

        // reload save stub because yield was set
        reloadStub(userModel.prototype, 'save');

        done();
      }, 0);
    });

    it('should report error if encountered', function(done) {

      // delete req.body.username;
      userModel.prototype.save.yields('err');
      controller.createUser(req, res);

      setTimeout(function() {
        expect(reportErrorStub.calledWith(sinon.match.any,
                                          sinon.match.any,
                                          'Error saving user model',
                                          500)).to.be.true;

        // reload stub because yields was set
        reloadStub(userModel.prototype, 'save');

        done();
      }, 0);
    });
  });

  describe('#getUser', function() {
    var req;
    var res;
    var status;
    var json;

    before(function() {
      sinon.stub(userModel, 'findOne');
    });

    beforeEach(function() {
      req = {
        params: {
          username: 'AndrewSouthpaw',
          userID: 1
        }
      };

      status = sinon.stub();
      json = sinon.stub();

      res = {
        status: status.returns({ json: json })
      };
    });

    afterEach(function() {
      userModel.findOne.reset();
    });

    after(function() {
      userModel.findOne.restore();
    });

    it('should call User.findOne', function(done) {
      controller.getUser(req, res);

      setTimeout(function() {
        expect(userModel.findOne.callCount).to.equal(1);
        done();
      }, 0);
    });

    it('should report error with status 500 if there is an error', function(done) {
      userModel.findOne.yields('err exists');
      controller.getUser(req, res);

      setTimeout(function() {
        expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, 500)).to.be.true;
        reloadStub(userModel, 'findOne');
        done();
      }, 0);
    });

    it('should report no user found with status 404', function(done) {
      userModel.findOne.yields(null, null);
      controller.getUser(req, res);

      setTimeout(function() {
        expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, 404)).to.be.true;
        reloadStub(userModel, 'findOne');
        done();
      }, 0);
    });

    it('should run res.status(200).json() if there is no error', function(done) {
      userModel.findOne.yields(null, 'user');
      controller.getUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(200)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
        reloadStub(userModel, 'findOne');
        done();
      }, 0);
    });
  });

  describe('#getUsers', function() {

    var req;
    var res;
    var status;
    var json;

    before(function() {
      sinon.stub(userModel, 'find');
    });

    beforeEach(function() {
      req = {};

      status = sinon.stub();
      json = sinon.stub();

      res = {
        status: status.returns({ json: json })
      };
    });

    afterEach(function() {
      userModel.find.reset();
    });

    after(function() {
      userModel.find.restore();
    });

    it('should call `User.find`', function() {
      controller.getUsers(req, res);
      expect(userModel.find.called).to.be.true;
    });

    it('should return status 200 with users on success', function() {
      var result = [{ username: 'Andrew' }, { username: 'Billy' }];
      userModel.find.yields(null, result);
      controller.getUsers(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.called).to.be.true;
      expect(res.status().json.calledWith(result)).to.be.true;
      reloadStub(userModel, 'find');
    });

    it('should return status 500 with error message on fail', function() {
      userModel.find.yields('error message', null);
      controller.getUsers(req, res);
      expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, 500)).to.be.true;
    });

  });

  describe('#editUser', function() {

    var req;
    var res;
    var status;
    var json;
    var bodyData;

    before(function() {
      sinon.stub(userModel, 'update');
    });

    beforeEach(function() {
      bodyData = { data: 'new data' };

      req = {
        params: {
          username: 'Andrew'
        },
        body: bodyData
      };

      status = sinon.stub();
      json = sinon.stub();

      res = {
        status: status.returns({
          end: sinon.stub(),
          json: json
        })
      };
    });

    afterEach(function() {
      userModel.update.reset();
    });

    after(function() {
      userModel.update.restore();
    });

    it('should call `User.update` with parameters', function() {
      controller.editUser(req, res);
      expect(userModel.update.calledWith(sinon.match({ username: 'Andrew' }), bodyData)).to.be.true;
    });

    it('should return 500 and error message on database error', function() {
      userModel.update.yields('error', null, null);
      controller.editUser(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.status().json.calledWith(sinon.match({ message: 'error' }))).to.be.true;
      reloadStub(userModel, 'update');
    });

    it('should return 404 and message on user not found', function() {
      userModel.update.yields(null, null, null);
      controller.editUser(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.status().json.calledWith(sinon.match({ message: 'User not found' }))).to.be.true;
      reloadStub(userModel, 'update');
    });

    it('should return 201 on success', function() {
      userModel.update.yields(null, 1, 'success');
      controller.editUser(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.status().end.called).to.be.true;
    });
  });
});
