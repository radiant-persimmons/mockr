;(function(){

  angular
    .module('app.controllers.EditRoutesController', [
      'app.services.RouteFactory'
    ])
    .controller('EditRoutesController', EditRoutesController);

  EditRoutesController.$inject = ['$state', '$stateParams', 'RouteFactory'];

  function EditRoutesController($state, $stateParams, RouteFactory) {
    var vm = this;
    vm.routeId = $stateParams.id;
    vm.buttonStatus = 'SAVE';
    vm.errorMessage = '';
    vm.formInfo = {
      route: '',
      methods: [],
      body: {}
    };
    vm.updateRoute = updateRoute;
    vm.deleteRoute = deleteRoute;

    activate();

    ////////////

    function displayForm() {
      console.log(vm.formInfo);
    }

    function activate() {
      // TEMP DEBUG
      vm.formInfo = {
        route: '/api/messages',
        body: {
          GET: 'I\'m a get request',
          POST: 'I\'m a post request'
        },
      };
      vm.formInfo.methods = Object.keys(vm.formInfo.body);



      // // get route info from server TODO
      // RouteFactory.getRoute(vm.routeId)
      //   .then(function(res) {
      //     console.log('route has been fetched');

      //   }).catch(function(err) {
      //     console.error('error fetching route', vm.routeId);
      //   });
    }

    function updateRoute() {
      // Change button status
      vm.buttonStatus = 'Saving...';

      // Submit data
      RouteFactory.updateRoute(vm.formInfo)
        .then(function(res) {
          $state.go('home');
        }).catch(function(err) {
          // TODO display error message
          vm.buttonStatus = 'SAVE';
          vm.errorMessage = 'Error occurred when saving route.';
        });
    }

    function deleteRoute(argument) {
      RouteFactory.deleteRoute(vm.route);
    }
  }



})();
