// describe('UNIT: navbar directive', function() {
//   console.log('UNIT NAVBAR');
//   var element;
//   var scope;
//   var $httpBackend;

//   function NavbarControllerStub() {
//     console.log('hello navbar stub');
//     var vm = this;
//     vm.test = 'hello';
//   }

//   beforeEach(module(function($provide) {
//     $provide.value('auth', {});
//     $provide.value('user', {});
//   }));

//   beforeEach(function() {
//     module('app.core', function($provide, $controllerProvider) {
//       $controllerProvider.register('NavbarController', NavbarControllerStub);
//     });
//   });

//   // beforeEach(module('app.core'), function($provide, $controllerProvider) {
//   //   $controllerProvider.register('NavbarController', NavbarControllerStub);
//   // });

//   beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {
//     $httpBackend = _$httpBackend_;
//     $httpBackend
//       .expectGET('/html/core/directives/nav-bar.directive.html')
//       .respond(200);

//     element = $compile('<navbar></navbar>');
//     $httpBackend.flush();
//     scope = $rootScope.$new();
//     scope.$digest();
//   }));

//   it('should show login button, and logo links to root', function() {
//     // expect()
//   });
// });
