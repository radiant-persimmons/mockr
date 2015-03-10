describe('UNIT: test directive', function() {
  var element;
  var scope;
  var $httpBackend;

  function TestControllerStub() {
    var vm = this;
    vm.name = 'hello';
  }

  beforeEach(module(function($provide) {
    $provide.value('auth', {});
    $provide.value('user', {});
  }));

  beforeEach(function() {
    module('app.directives.test', function($provide, $controllerProvider) {
      $controllerProvider.register('TestController', TestControllerStub);
    })
  });
  // beforeEach(module('app.core'), function($provide, $controllerProvider) {
  //   $controllerProvider.register('NavbarController', NavbarControllerStub);
  // });

  beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    element = $compile('<navbar-test></navbar-test>')(scope);
    scope.$digest();
  }));

  it('should show login button, and logo links to root', function() {
    expect(element.find('h1').text()).to.equal('Hello hello');
  });
});
