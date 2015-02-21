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
      methods: {}
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

    function getRoute() {
      // var res = {
      //     username: 'Andrew',
      //     route: 'api/rooms',
      //     methods: { GET: { status: 200, headers: {}, data: '["lobby", "coolpeeps"]' },
      //                POST: {status: 201, headers: {}, data: 'Post received'}
      //              },
      //     persistance: false,
      //     data: [],
      //     count: 0
      // }

      // vm.formInfo.methods = res.methods;
      // vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);

      console.log('retrieving', vm.formInfo.route, 'for', user.getUser().username);
      return routes.getRoute(vm.formInfo.route)
        .then(function(res) {
          console.log('route has been fetched:', res);
          /**
           * The endpoint DB model stores response, headers, status, etc., all
           * on the `methods` property. Here we're separating out method keys from
           * the body for the sake of ng-repeat in view.
           */
          vm.formInfo.methods = res.methods;
          vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
          console.log('updated formInfo', vm.formInfo);
          return;
        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
          console.error('Message:', err);
        });

    }
  }



})();
