/*jshint -W079 */
/*jshint expr:true */

describe('UNIT: nav-bar.controller.js', function() {

  var auth;
  var user;
  var ctrl;
  var authStub;
  var userStub;

  beforeEach(module('app'));
  beforeEach(module(function($provide) {
    authStub = {
      login: sinon.stub(),
      logout: sinon.stub()
    };

    userStub = {
      getUser: sinon.stub(),
      loggedIn: sinon.stub(),
      registerCb: sinon.stub()
    };

    userStub.getUser.returns({ username: 'Andrew', avatar: 'avatar.png' });
    userStub.loggedIn.returns(true);
    userStub.registerCb.yields('ping');

    $provide.value('auth', authStub);
    $provide.value('user', userStub);

  }));
  beforeEach(inject(function($controller) {
    ctrl = $controller('NavbarController', {});
  }));

  describe('initialization', function() {
    it('should register callback with user service', function() {
      expect(userStub.registerCb.callCount).to.equal(1);
      expect(userStub.registerCb.calledWith(sinon.match.func)).to.be.true;
    });

    it('should set username, logged in status, and avatar after resolve', function() {
      expect(ctrl.username).to.equal('Andrew');
      expect(ctrl.loggedIn).to.equal(true);
      expect(ctrl.avatar).to.equal('avatar.png');
    });
  });

  describe('#login', function() {
    it('should call auth.login', function() {
      ctrl.login();
      expect(authStub.login.called).to.be.true;
    });
  });

  describe('#logout', function() {
    it('should call auth.logout', function() {
      ctrl.logout();
      expect(authStub.logout.called).to.be.true;
    });
  });
});
