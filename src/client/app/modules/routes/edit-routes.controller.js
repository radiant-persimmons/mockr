;(function(){

  angular
    .module('app.controllers.EditRoutesController', [])
    .controller('EditRoutesController', EditRoutesController);

  /* @ngInject */
  function EditRoutesController($state, $stateParams, routes) {
    var vm = this;

    vm.allMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    vm.buttonStatus = 'SAVE';
    vm.errorMessage = '';

    // form info regarding this route
    vm.formInfo = {
      route: $stateParams.route,
      methods: [],
      body: {}
    };

    vm.updateRoute = updateRoute;
    vm.deleteRoute = deleteRoute;
    vm.toggleMethod = toggleMethod;

    activate();

    ////////////

    /**
     * initialization of controller. Grabs route data from server and populates
     * the form.
     */
    function activate() {
      // TEMP DEBUG TODO FIX
      vm.formInfo = {
        route: '/api/messages',
        body: {
          GET: 'I\'m a get request',
          POST: 'I\'m a post request'
        }
      };
      vm.formInfo.methods = Object.keys(vm.formInfo.body);


      // // get route info from server
      getRoute();
    }

    /**
     * pushes updates route info to the database. Handles error with display
     * of an error message.
     */
    // TODO: should updateRoute pass a param of route???
    function updateRoute() {
      // Change button label to indicate route is saving
      vm.buttonStatus = 'Saving...';

      // Submit data. Returns promise for any consumer to act upon resolution
      return routes.updateRoute(vm.formInfo)
        // navigate to home on successful save
        .then(function(res) {
          $state.go('home');
        // otherwise display error message
        }).catch(function(err) {
          // TODO display better error message
          vm.buttonStatus = 'SAVE';
          vm.errorMessage = 'Error occurred when saving route';
        });
    }

    /**
     * deletes route entirely from database
     */
    function deleteRoute(argument) {
      routes.deleteRoute(vm.formInfo.route);
    }

    /**
     * handles logic for when user checks and unchecks a method for a route.
     * When unchecking, deletes that method from the route. When checking,
     * adds a new set of body data for user to input
     */
    function toggleMethod(method) {
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

    function getRoute() {
      routes.getRoute($stateParams.route)
        .then(function(res) {
          console.log('route has been fetched');

        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
        });
    }
  }



})();
