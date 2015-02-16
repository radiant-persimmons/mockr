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
    // it('Should create a new user', function (done) {
    //   User.find({}, function (err, users) {
    //     expect(users.length).to.equal(1);
    //     done();
    //   });
    // });
  });

});

//   it('should work', function() {
//     expect(true).to.equal(true);
//   });
// });
