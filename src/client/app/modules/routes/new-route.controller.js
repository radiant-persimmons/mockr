;(function(){

  angular
    .module('app.controllers.NewRouteController', [])
    .controller('NewRouteController', NewRouteController);

  /* @ngInject */
  function NewRouteController($state, $stateParams, user, routes) {
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
      persistence: false,
      businessLogic: '(function(){\n\n})()'
    };

    vm.saveRoute = saveRoute;
    vm.toggleMethod = toggleMethod;
    vm.togglePersistence = togglePersistence;

    activate();

    ////////////

    /**
     * initialization of controller. Grabs route data from server and populates
     * the form.
     */
    function activate() {}

    /**
     * pushes updates route info to the database. Handles error with display
     * of an error message.
     */
    // TODO: should saveRoute pass a param of route???
    function saveRoute() {
      // Change button label to indicate route is saving
      vm.buttonStatus = 'Saving...';

      // Submit data. Returns promise for any consumer to act upon resolution
      console.log(vm.formInfo);
      return routes.addRoute(vm.formInfo)
        // navigate to home on successful save
        .then(function(res) {
          $state.go('home.home');
        // otherwise display error message
        }).catch(function(err) {
          // TODO display better error message
          vm.buttonStatus = 'SAVE';
          vm.errorMessage = 'Error occurred when saving route';
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
        vm.formInfo.methods[method] = '';
      }

      // update keys
      vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
    }

    function togglePersistence() {
      vm.formInfo.persistence = !vm.formInfo.persistence;
    }
  }



})();
