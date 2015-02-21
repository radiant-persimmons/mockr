;(function(){

  angular
    .module('app.controllers.EditRoutesController', [])
    .controller('EditRoutesController', EditRoutesController);

  /* @ngInject */
  function EditRoutesController($state, $stateParams, user, routes) {
    var vm = this;

    vm.allMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    vm.buttonStatus = 'SAVE';
    vm.errorMessage = '';

    // form info regarding this route
    vm.formInfo = {
      route: $stateParams.route,
      methodKeys: [],
      methods: {},
      data: [],
      persistance: false
    };

    vm.updateRoute = updateRoute;
    vm.deleteRoute = deleteRoute;
    vm.toggleMethod = toggleMethod;
    vm.togglePersistance = togglePersistance;

    activate();

    ////////////

    /**
     * initialization of controller. Grabs route data from server and populates
     * the form.
     */
    function activate() {
      // getRoute();
      getRoute().then(function() {
        console.log('route received');
      });
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
      if (typeof vm.formInfo.methods[method] !== 'undefined') {
        delete vm.formInfo.methods[method];

      // otherwise add it to the form
      } else {
        vm.formInfo.methods[method] = '';
      }

      // update keys
      vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
    }

    function togglePersistance() {
      vm.formInfo.persistance = !vm.formInfo.persistance;
    }

    function getRoute() {
      return routes.getRoute(vm.formInfo.route)
        .then(function(res) {
          /**
           * The endpoint DB model stores response, headers, status, etc., all
           * on the `methods` property. Here we're separating out method keys from
           * the body for the sake of ng-repeat in view.
           */
          vm.formInfo.methods = res.methods;
          vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
          vm.formInfo.persistance = res.persistance;
          vm.formInfo.data = res.data;
          return;
        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
          console.error('Message:', err);
        });

    }
  }



})();
