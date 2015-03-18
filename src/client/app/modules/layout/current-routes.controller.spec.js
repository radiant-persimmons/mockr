/*jshint -W079 */
/*jshint expr:true */

describe('UNIT: layout/current-routes.controller.js', function() {

  var ctrl;
  var $stateStub;
  var routesStub;
  var userStub;
  var $scope;

  beforeEach(module('app.controllers.CurrentRoutesController'));
  beforeEach(module(function($provide) {
    $stateStub = {
      go: sinon.stub()
    };

    routesStub = {
      routes: ['api/test1', 'api/test2'],
      fetch: sinon.stub().returns({ then: sinon.stub().yields(null) })
    };

    userStub = {
      getUser: sinon.stub().returns({ username: 'Andrew' }),
      registerCb: sinon.stub()
    };
    userStub.registerCb.yields(null);

    $provide.value('$state', $stateStub);
    $provide.value('routes', routesStub);
    $provide.value('user', userStub);
  }));

  /**
   * provide real $scope to controller for $watch functionality. Follow
   * guide from http://jristr.com/blog/2014/11/learning-ng-testing-watch-expressions
   */
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    ctrl = $controller('CurrentRoutesController', {
      $scope: $scope
    });

    $scope.vm = ctrl;
  }));

  describe('#activate', function() {
    it('should register callback with user', function() {
      expect(userStub.registerCb.calledWith(sinon.match.func)).to.be.true;
    });

    it('should fetch routes after resolve', function() {
      expect(routesStub.fetch.calledWith('Andrew')).to.be.true;
    });
  });

  describe('updates to routes', function() {
    it('should update local routes when service changes', function() {
      routesStub.routes = ['api/test1'];
      $scope.$digest();
      expect(ctrl.routes).to.eql(['api/test1']);
    });
  });
});
