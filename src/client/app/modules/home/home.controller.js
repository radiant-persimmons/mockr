;(function(){

  angular
    .module('app.controllers.HomeController', [
      'app.services.user',
      'app.services.routes'
    ])
    .controller('HomeController', HomeController);

  /**
  * the home controller is responsible for displaying the info on the main page of the app
  * It stores and displays data on what routes the user has available to them
  * This page serves as a jumping off point to editing individual routes and makes
  * adding and removing new routes easy
  *
  * @ngInject
  */
  function HomeController($http, routes, user) {
    var vm = this;
    vm.formInfo = {
      route: '',
      methodKeys: [],
      methods: {}
    };
    vm.routes = routes.routes;
    vm.allMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    vm.addRoute = addRoute;
    vm.toggleMethod = toggleMethod;
    activate();

    /////////////////////////

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
    * Process to capture and add route information from the user then store them in
    * the database
    */
    function addRoute() {
      routes.addRoute(vm.formInfo, user.getUser().username)
        .then(function() {
          // clear form data
          vm.formInfo.methodKeys.length = 0;
          vm.formInfo.methods = {};
          vm.formInfo.route = '';
        });
    }

    /**
     * handles logic for when user checks and unchecks a method for a route.
     * When unchecking, deletes that method from the route. When checking,
     * adds a new set of body data for user to input
     */
    function toggleMethod(method) {
      // delete method from body if present
      if (typeof vm.formInfo.methods[method] !== 'undefined') {
        delete vm.formInfo.methods[method];

      // otherwise add it to the form
      } else {
        vm.formInfo.methods[method] = {};
      }

      // update keys
      vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
    }

    //TODO Add functionality here
    function editRoute() {}

    //TODO Add functionality here
    function deleteRoute() {
      routes.deleteRoute();
    }

  }

})();
