/*jshint -W079 */

var expect = require('chai').expect;
var User = require('../../server/api/user/userModel');

describe('Unit: database: User model', function () {
  beforeEach(function (done) {
    User.remove({}, function() {
      var user = new User({
        username: 'Jake',
        userID: 1234,
        endpoints: {1: '/locations', 2: '/pictures'}
      });
      user.save(function () {
        done();
      });
    });
  });
  describe('#CreateUser', function () {
    it('Should create a new user', function (done) {
      User.find({}, function (err, users) {
        expect(users.length).to.equal(1);
        done();
      });
    });
    it('Should save a username, userID and endpoints', function (done) {
      User.findOne({ username: 'Jake'}, function (err, user) {
        expect(user.username).to.equal('Jake');
        expect(user.userID).to.equal(1234);
        expect(user.endpoints[1]).to.equal('/locations');
        done();
      });
    });
  });

});

//BELOW NOT NECESSARY BC WE ARE USING ONLY PASSPORT AUTH
//IF WE WANT TO ALLOW FOR MANUAL ACCOUNT CREATION, USE BELOW TESTS

// var userController = require('../../server/api/user/userController');
// var express = require('express');
// var app = require('../../server/index.js');
// var request = require('supertest');

// describe('INTEGRATION: Server + DB: /api/user', function () {
//   // Clear Users database for testing
//   beforeEach(function(done) {
//     User.remove({}, function() {
//       var user = new User({
//         username: 'Bo',
//         userID: 123,
//         endpoints: {1:'/locations'}
//       });
//       user.save(function() {
//         done();
//       });
//     });
//   });
//   describe('GET /', function () {
//     it('should return an array of user objects', function (done) {
//       request(app)
//         .get('/api/users')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(function(res) {
//           expect(res.body).to.be.an('array');
//           expect(res.body).to.have.length(1);
//         })
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//     });
//   });
//   describe('POST /', function () {
//     it('should store a new user', function (done) {
//       request(app)
//         .post('/api/users')
//         .send({ username: 'Jake', userID: 1234, endpoints: {1: '/locations'} })
//         .expect(201)
//         .end(function(err, res) {
//           if (err) return done(err);

//           request(app).get('/api/users')
//             .expect(function(res) {
//               expect(JSON.stringify(res.body)).to.contain('Jake');
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//         });
//     });
//     it('should disallow duplicate user creation', function (done) {
//       request(app)
//         .post('/api/users')
//         .send({ username: 'Jake', userID: 1234, endpoints: {1: '/locations'} })
//         .expect(409, done);
//     });
//   });
// });
