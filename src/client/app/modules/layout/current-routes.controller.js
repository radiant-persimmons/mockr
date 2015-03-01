;(function() {

  angular
    .module('app.controllers.CurrentRoutesController', [])
    .controller('CurrentRoutesController', CurrentRoutesController);

  /* @ngInject */
  function CurrentRoutesController($scope, routes, user) {
    var vm = this;

    vm.routes = routes.routes;

    activate();

    ///////////

    /**
    * Activate gets called on module load and calls fetch which fetches user data
    * from the database and displays it for the user
    */
    function activate() {
      user.registerCb(function(){
        routes.fetch(user.getUser().username)
          .then(function() {});
      });

    }

    /**
     * Listen for changes on routes service, update as necessary.
     */
    $scope.$watch(function() {
      return routes.routes;
    }, function(newValue) {
      vm.routes = routes.routes;
    });
  }

}).call(this);
