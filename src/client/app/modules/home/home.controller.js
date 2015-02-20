;(function(){

  angular
    .module('app.controllers.HomeController', [
      'app.services.routes',
      'app.services.user',
      'checklist-model'
    ])
    .controller('HomeController', HomeController);

  HomeController.$inject = [
    '$http',
    'routes',
    'user'
  ];

  /**
  * the home controller is responsible for displaying the info on the main page of the app
  * It stores and displays data on what routes the user has available to them
  * This page serves as a jumping off point to editing individual routes and makes
  * adding and removing new routes easy
  */
  //runs activate on startup

  function HomeController($http, routes, user, checklist) {
    var vm = this;
    vm.formInfo = {
      methods: [],
      body: {}
    };
    vm.routes = routes.routes;
    vm.verbs = ['GET', 'POST', 'PUT', 'DELETE'];

    vm.addRoute = addRoute;
    vm.toggleRoute = toggleRoute;

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
        
          //resets the the text box back to empty
          vm.formInfo.route = '';
        });
    }

    /**
     * handles logic for when user checks and unchecks a method for a route.
     * When unchecking, deletes that method from the route. When checking,
     * adds a new set of body data for user to input
     */
    function toggleRoute(method) {
      // delete method from body if present
      if (typeof vm.formInfo.body[method] !== 'undefined') {
        delete vm.formInfo.body[method];

      // otherwise add it to the form
      } else {
        vm.formInfo.body[method] = '';
      }

      // update keys
      vm.formInfo.methods = Object.keys(vm.formInfo.body);
    }

    //TODO Add functionality here
    function editRoute() {}

    //TODO Add functionality here
    function deleteRoute() {
      routes.deleteRoute();
    }

  }

})();
