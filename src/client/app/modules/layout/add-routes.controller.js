;(function() {

  angular
    .module('app.controllers.AddRoutesController', [])
    .controller('AddRoutesController', AddRoutesController);

  /* @ngInject */
  function AddRoutesController($state, routes, user) {
    var vm = this;

    vm.formInfo = {
      route: ''
    };

    vm.addRoute = addRoute;

    ///////////

    /**
    * Proceed to new route state for user to edit the new route
    */
    function addRoute() {
      $state.go('home.new-route', { route: vm.formInfo.route });
      vm.formInfo.route = '';
    }
  }

}).call(this);
