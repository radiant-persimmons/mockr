/*jshint -W079 */
/*jshint expr:true */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var User = require('./userModel');

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

  it('should enforce username', function(done) {
    var user1 = new User({
      userID: 1
    });
    user1.save(function(err) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('should enforce userID', function(done) {
    var user1 = new User({
      username: 'Andrew'
    });
    user1.save(function(err) {
      expect(err).to.be.ok;
      done();
    });
  });

});
