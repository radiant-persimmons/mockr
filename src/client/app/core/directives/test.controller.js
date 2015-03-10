;(function() {

  angular.module('app.controllers.test', [])
    .controller('TestController', TestController);

  /* @ngInject */
  function TestController(user, auth) {
    vm.name = 'andrew'
  }

}).call(this);
