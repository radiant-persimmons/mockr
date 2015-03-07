/*jshint -W079 */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var request = require('supertest');
var sinon = require('sinon');
// var mockery = require('mockery');
var passportStub = require('passport-stub');
var controller = require('./userController');
var userModel = require('./userModel');
var mongoose = require('mongoose');
var mongooseMock = require('mongoose-mock');
var proxyquire = require('proxyquire');

// // userController, will be required after mock is set
// var controller;

describe('UNIT: userController.js', function() {

  // var saveSpy;

  // before(function() {
  //   mockery.enable({
  //     warnOnReplace: false,
  //     warnOnUnregistered: false,
  //     useCleanCache: true
  //   });

  //   // User model mock
  //   var userMock = function(params) {
  //     this.username = params.username;
  //     this.userID = params.userID;
  //     this.save = function(cb) {
  //       cb();
  //     };
  //     s
  //   };

  //   mockery.registerMock('./userModel', userMock);

  //   controller = require('./userController');
  // });

  // after(function() {
  //   mockery.disable();
  // });

  // describe('#createUser', function() {

  // });

  // it('test', function(done) {
  //   var req = {
  //     body: {
  //       username: 'Andrew',
  //       userID: 1
  //     }
  //   };
  //   var res = {
  //     status: function(statusCode) {
  //       return {
  //         end: function() {}
  //       };
  //     }
  //   }
  //   controller.createUser(req, res);
  //   done();
  // });

  // describe('module.getCurrentUser', function() {
  //   var req;
  //   var res;
  //   var jsonStub;

  //   // set up stubs on req and res
  //   beforeEach(function() {
  //     req = { user: 'Andrew' };
  //     jsonStub = sinon.stub();
  //     res = { status: sinon.stub().returns({ json: jsonStub }) };
  //   });

  //   it('should return status 200 with json object `req.user`', function() {
  //     controller.getCurrentUser(req, res);

  //     expect(res.status.calledOnce);
  //     expect(res.status.calledWith(200));

  //     expect(jsonStub.calledOnce);
  //     expect(jsonStub.calledWith(req.user));
  //   });
  // });

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

  // describe('#createUser', function() {

  // });



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

      status.withArgs(201);
      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.called).to.equal(true);
        expect(res.status().end.called).to.equal(true);
        done();
      }, 100);
      //it might be a good idea to use a mock to check the status code
    });

    it('should run res.status(500).json() after saving is not successul', function(done) {

      status.withArgs(500);
      delete req.body.username;
      controller.createUser(req, res);

      setTimeout(function() {
        expect(res.status.called).to.equal(true);
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

    xit('should run res.status(500).json() if there is an error', function(done) {
      //something to make User.findOne fail

      controller.getUser(req, res);

      setTimeout(function() {
        expect(res.status.calledWith(500)).to.equal(true);
        expect(res.status().json.called).to.equal(true);
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
