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

    // Special stub to simulate error on model save
    var stubSaveErr = function(cb) {
      cb('Staged error in #save');
    };

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

    // restore regular functionality
    afterEach(function() {
    });

    it('should call `User.save`', function(done) {
      /**
       * How we stub `#save` will vary with each test, so we must do it
       * manually each time.
       */
       // console.log('save', userModel.prototype.save);
       sinon.stub(userModel.prototype, 'save');
      // sinon.stub(mongoose.Model.prototype, 'save');
      controller.createUser(req, res);
      /**
       * Since Mongoose's `save` is asynchronous, run our expectations on the
       * next cycle of the event loop.
       */
      setTimeout(function() {
        expect(userModel.prototype.save.callCount).to.equal(1);
        userModel.prototype.save.restore();
        done();
      }, 1000);
    });

    xit('should store `username` and `userID` on user', function(done) {
    //   var userData;

    //   // Special stub to reveal model data
    //   // var stubSaveData = function(cb) {
    //   //   userData = this;
    //   // };

    //   sinon.stub(mongoose.Model.prototype, 'save', function(cb) {
    //     userData = this;
    //   });
    //   controller.createUser(req, res);
    //   setTimeout(function() {
    //     expect(userData.username).to.equal('Andrew');
    //     expect(userData.userID).to.equal(1);

    //     done();
    //   }, 0);
    });

    it('should run res.status(201).end() after saving is successful', function(done) {

      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(201)).to.equal(true);
        expect(res.status().end.called).to.equal(true);
        done();
      }, 100);
      //it might be a good idea to use a mock to check the status code
    });

    it('should run res.status(500).json() after saving is not successul', function(done) {

      delete req.body.username;
      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(500)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
        done();
      }, 100);
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
      }, 100);
    });

    it('should run res.status(200).json() if there is no error', function(done) {
      controller.getUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(200)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
        done();
      }, 100);
    });
  });
});
