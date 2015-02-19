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
    vm.formInfo = {};
    vm.formInfo.verbs = [];
    vm.routes = routes.routes;
    vm.user = {};
    vm.verbs = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

    vm.addRoute = addRoute;

    activate();

    /////////////////////////

    /**
    * Process to capture and add route information from the user then store them in
    * the database
    */
    function addRoute() {
      console.log('adding', vm.formInfo);
      routes.addRoute(vm.formInfo, vm.user.username).then(function() {
        vm.formInfo.route = '';
        
      });
    }

    function editRoute() {}

    /**
    * Activate gets called on module load and calls fetch which fetches user data
    * from the database and displays it for the user
    */
    function activate() {
      console.log('registering cb');
      user.registerCb(function(){
        vm.user = user.getUser();
        routes.fetch(vm.user.username).then(function() {
        });
      });

    }
    function deleteRoute() {
      routes.deleteRoute();
    }

  }

})();
