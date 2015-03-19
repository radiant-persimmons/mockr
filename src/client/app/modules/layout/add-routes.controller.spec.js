/*jshint -W079 */
/*jshint expr:true */

describe('UNIT: layout/add-routes.controller.js', function() {

  var ctrl;
  var $stateStub;

  beforeEach(module('app.controllers.AddRoutesController'));
  beforeEach(module(function($provide) {
    $stateStub = {
      go: sinon.stub()
    };

    $provide.value('$state', $stateStub);
  }));

  beforeEach(inject(function($controller) {
    ctrl = $controller('AddRoutesController', {});
  }));

  describe('#addRoute', function() {
    it('should transition state and reset form route input', function() {
      ctrl.formInfo.route = 'api/test';
      ctrl.addRoute();
      expect($stateStub.go.calledWith('home.new-route', sinon.match({ route: 'api/test' }))).to.be.true;
      expect(ctrl.formInfo.route).to.equal('');
    });
  });
});
