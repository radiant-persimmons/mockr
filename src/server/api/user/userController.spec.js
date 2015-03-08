/*jshint -W079 */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var controller = require('./userController');
var userModel = require('./userModel');

describe('UNIT: userController.js', function() {

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

    // Helper function to restore stub to bland version
    function reloadSaveStub() {
      userModel.prototype.save.restore();
      sinon.stub(userModel.prototype, 'save');
    }

    it('should call `User.save`', function(done) {
      controller.createUser(req, res);
      /**
       * Since Mongoose's `save` is asynchronous, run our expectations on the
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
      userModel.prototype.save.restore();
      sinon.stub(userModel.prototype, 'save', stubSaveData);

      controller.createUser(req, res);
      setTimeout(function() {
        expect(userData.username).to.equal('Andrew');
        expect(userData.userID).to.equal(1);

        // return to ordinary stub
        reloadSaveStub();

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
        reloadSaveStub();

        done();
      }, 0);
    });

    it('should run res.status(500).json() after saving is not successul', function(done) {

      // delete req.body.username;
      userModel.prototype.save.yields('err')
      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(500)).to.equal(true);
        expect(res.status().json.called).to.equal(true);

        // reload stub because yields was set
        reloadSaveStub();

        done();
      }, 0);
    });
  });

  describe('#getUser', function() {
    var req;
    var res;
    var status;
    var json;

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

    it('should call User.findOne', function(done) {
      sinon.stub(userModel, 'findOne');

      controller.getUser(req, res);

      console.log('userModel findOne', userModel.findOne);
      setTimeout(function() {
        expect(userModel.findOne.callCount).to.equal(1);
        userModel.findOne.restore();
        done();
      }, 0);
    });

    it('should run res.status(500).json() if there is an error', function(done) {
      //something to make User.findOne fail
      sinon.stub(userModel, 'findOne').yields('err exists');
      controller.getUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(500)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
        userModel.findOne.restore();
        done();
      }, 0);
    });

    it('should run res.status(200).json() if there is no error', function(done) {
      controller.getUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(200)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
        done();
      }, 0);
    });
  });
});
