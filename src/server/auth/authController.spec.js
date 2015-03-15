/*jshint -W079 */
/* jshint expr:true */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var sinon = require('sinon');
var ctrl = require('./authController');

describe('UNIT: authController.js', function() {
  var next;
  var req;
  var res;

  beforeEach(function() {
    res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
      redirect: sinon.stub()
    };
    next = sinon.stub();
  });

  describe('#isAuthenticatedUser', function() {
    it('should pass to next when usernames match', function() {
      req = {
        user: { username: 'Andrew' },
        params: { username: 'Andrew' }
      };
      ctrl.isAuthenticatedUser(req, res, next);
      expect(next.called).to.be.true;
    });

    it('should return 401 when usernames do not match', function() {
      req = {
        user: { username: 'Andrew' },
        params: { username: 'Billy' }
      };
      ctrl.isAuthenticatedUser(req, res, next);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.status().json.calledWith(sinon.match({ message: 'Not authenticated' }))).to.be.true;
    });
  });

  describe('#logout', function() {
    it('should destroy session and redirect to /', function() {
      req = {
        session: {
          destroy: sinon.stub().yields(null)
        }
      };
      ctrl.logout(req, res, next);
      expect(req.session.destroy.called).to.be.true;
      expect(res.redirect.calledWith('/')).to.be.true;
    });
  });

  describe('#restricted', function() {
    it('should pass to next when req.user exists', function() {
      req = { user: 'exists' };
      ctrl.restricted(req, res, next);
      expect(next.called).to.be.true;
    });
    it('should return 401 when req.user does not exist', function() {
      req = {};
      ctrl.restricted(req, res, next);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.status().json.calledWith(sinon.match({ message: 'Not authenticated' }))).to.be.true;
    });
  });
});
