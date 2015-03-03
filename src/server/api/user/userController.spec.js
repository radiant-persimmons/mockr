/*jshint -W079 */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
var passportStub = require('passport-stub');
var controller = require('./userController')
var userModel = require('./userModel');
var mongoose = require('mongoose');
var mongooseMock = require('mongoose-mock');
var proxyquire = require('proxyquire');


describe('UNIT: userController.js', function() {

  describe('module.getCurrentUser', function() {
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

      expect(res.status.calledOnce);
      expect(res.status.calledWith(200));

      expect(jsonStub.calledOnce);
      expect(jsonStub.calledWith(req.user));
    });
  });

  // describe('module.createUser', function() {
  //   var User;
  //   var req;
  //   var res;

  //   beforeEach(function() {
  //     User = proxyquire('./userModel', { 'mongoose': mongooseMock });
  //     req = {
  //       body: {
  //         username: 'Andrew',
  //         userID: 1
  //       }
  //     };
  //     res = {
  //       status: function(statusCode) {
  //         return {
  //           end: function() {}
  //         };
  //       }
  //     }
  //   });

  //   describe('functionality', function() {
  //     it('calls save', function() {
  //       var cb = sinon.spy();
  //       controller.createUser(req, res);
  //       console.log(User);
  //       console.log(Object.keys(User));
  //       expect(User.save.called).to.equal(true);
  //     });
  //   });
  // });

  describe('#createUser', function() {
    var req;
    var res;

    req = {
      body: {
        username: 'Andrew',
        userID: 1
      }
    };

    var endStub = sinon.stub();
    res = {
      status: sinon.stub.returns({ end: endStub }),
      end: sinon.stub()
    };

    // Special stub to simulate error on model save
    var stubSaveErr = function(cb) {
      cb('Staged error in #save')
    };

    // Stub out req and res
    beforeEach(function() {
      // req = {
      //   body: {
      //     username: 'Andrew',
      //     userID: 1
      //   }
      // };

      // res = {
      //   status: sinon.stub.returns({ end: sinon.stub() }),
      //   end: sinon.stub()
      // };

    });

    // after(function() {
    //   mongoose.Model.prototype.save.restore();
    // });


    // restore regular functionality
    afterEach(function() {
      // console.log(mongoose.Model.prototype.save);
      console.log('unwrapping');
      mongoose.Model.prototype.save.restore();
      // console.log(mongoose.Model.prototype.save);
    });

    it('should call `User.save`', function(done) {
      /**
       * How we stub `#save` will vary with each test, so we must do it
       * manually each time.
       */
      sinon.stub(mongoose.Model.prototype, 'save');
      controller.createUser(req, res);
      /**
       * Since Mongoose's `save` is asynchronous, run our expectations on the
       * next cycle of the event loop.
       */
      setTimeout(function() {
        expect(mongoose.Model.prototype.save.callCount).to.equal(1);
        done();
      }, 0);
    });

    // it('should store `username` and `userID` on user', function(done) {
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
    // });

    it('should do what...', function(done) {
      console.log('wrapping');
      console.log(mongoose.Model.prototype.save);
      sinon.stub(mongoose.Model.prototype, 'save', function() {

      });
      // sinon.spy(res, 'end');
      controller.createUser(req, res);
      setTimeout(function() {
        expect(res.status.called).to.equal(true);
        done();
      }, 0)
    });

    // it('should do what...', function(done) {
    //   console.log('wrapping');
    //   console.log(mongoose.Model.prototype.save);
    //   sinon.stub(mongoose.Model.prototype, 'save', stubSaveErr);
    //   // sinon.spy(res, 'end');
    //   controller.createUser(req, res);
    //   setTimeout(function() {
    //     expect(res.status.called).to.equal(true);
    //     done();
    //   }, 0)
    // });
  });
});
