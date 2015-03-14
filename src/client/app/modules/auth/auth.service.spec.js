/* jshint -W024 */
/* jshint expr:true */

describe('UNIT: auth.service.js', function() {
  var $window;
  var auth;

  beforeEach(function() {
    module('app.services.auth');

    /**
     * Override Angular's $window provision with a stub. Strategy borrowed from
     * this SO thread: http://bit.ly/1F5dxeA
     */
    $window = { location: { replace: sinon.stub() } };
    module(function($provide) {
      $provide.value('$window', $window);
    });

    inject(function(_auth_) {
      auth = _auth_;
    });
  });

  describe('auth factory', function() {
    it('should have certain keys', function() {
      expect(auth).to.have.keys(['login', 'logout']);
    });
  });

  describe('#login', function() {
    it('should set window to /auth/github', function() {
      auth.login();
      expect($window.location.replace.calledWith('/auth/github')).to.be.true;
    });
  });

  describe('#logout', function() {
    it('should set window to /auth/logout', function() {
      auth.logout();
      expect($window.location.replace.calledWith('/auth/logout')).to.be.true;
    });
  });

});
