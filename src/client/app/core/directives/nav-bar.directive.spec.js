/*jshint -W079 */
/*jshint expr:true */

describe('UNIT: navbar directive', function() {
  var element;
  var scope;
  var $httpBackend;

  describe('before login', function() {
    /**
     * Because it's not clear how to do otherwise, different controller stubs
     * are provided to represent different states in the navbar.
     */
    var NavbarControllerStub = function() {
      var vm = this;
      vm.loggedIn = false;
    };

    /**
     * Since `run.config.js` uses `auth` and `user` services, we need to stub
     * them here so the app can finish loading.
     */
    beforeEach(module(function($provide) {
      $provide.value('auth', {});
      $provide.value('user', {});
    }));

    // Load directive template provided by ng-html2js
    beforeEach(module('/html/core/directives/nav-bar.directive.html'));

    /**
     * Provide stubbed version of directive controller in lieu of real
     * one.
     */
    beforeEach(function() {
      module('app.core', function($provide, $controllerProvider) {
        $controllerProvider.register('NavbarController', NavbarControllerStub);
      });
    });

    /**
     * Handle other templates that should be stubbed, create a new scope,
     * compile the directive into an element, and run a digest cycle.
     */
    beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {
      /**
       * Because the directive is part of app.core, the whole page will be
       * loaded. Anticipate template requests for the landing page.
       */
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET('/html/modules/landing/landing.html')
        .respond(200);

      scope = $rootScope.$new();
      element = $compile('<navbar></navbar>')(scope);
      scope.$digest();

      // Flush $httpBackend to clear out template requests
      $httpBackend.flush();
    }));

    it('should show login button, and logo links to root', function() {
      expect(element.find('a[href="/"]').hasClass('ng-hide')).to.be.false;
      expect(element.find('a[href="/home"]').hasClass('ng-hide')).to.be.true;
    });
  });

  describe('after login', function() {
    var NavbarControllerStub = function() {
      var vm = this;
      vm.loggedIn = true;
    };

    beforeEach(module(function($provide) {
      $provide.value('auth', {});
      $provide.value('user', {});
    }));

    // Load directive template provided by ng-html2js
    beforeEach(module('/html/core/directives/nav-bar.directive.html'));

    beforeEach(function() {
      module('app.core', function($provide, $controllerProvider) {
        $controllerProvider.register('NavbarController', NavbarControllerStub);
      });
    });

    beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {
      /**
       * Because the directive is part of app.core, the whole page will be
       * loaded. Anticipate template requests for the landing page.
       */
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET('/html/modules/landing/landing.html')
        .respond(200);

      scope = $rootScope.$new();
      element = $compile('<navbar></navbar>')(scope);
      scope.$digest();
      $httpBackend.flush();
    }));

    it('should show username, avatar, logout, and logo links to home', function() {
      expect(element.find('a[href="/"]').hasClass('ng-hide')).to.be.true;
      expect(element.find('a[href="/home"]').hasClass('ng-hide')).to.be.false;

      expect(element.find('ul li a[ng-click="vm.login()"]').parent().hasClass('ng-hide')).to.be.true;
      expect(element.find('ul li a[ng-click="vm.logout()"]').parent().hasClass('ng-hide')).to.be.false;
    });
  });
});
