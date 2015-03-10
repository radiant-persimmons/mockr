;(function() {

  angular.module('app.controllers.test', [])
    .controller('TestController', TestController);

  /* @ngInject */
  function TestController(user, auth) {
    console.log('TestController');
    vm.name = 'andrew'
  }

}).call(this);
