;(function(){

  angular
    .module('app.controllers.EditRoutesController', [
      'app.services.RouteFactory'
    ])
    .controller('EditRoutesController', EditRoutesController);

  EditRoutesController.$inject = ['$stateParams', 'RouteFactory'];

  function EditRoutesController($stateParams, RouteFactory) {
    var vm = this;
    vm.routeId = $stateParams.id;
    vm.buttonStatus = 'SAVE';
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
        methods: ['GET', 'POST']
      }

      console.log('activate finished');
      console.log(vm.formInfo);

      // vm.formInfo.methods = _.pluck

      // // get route info from server
      // RouteFactory.getRoute(vm.routeId)
      //   .then(function(res) {
      //     console.log('route has been fetched');

      //   }).catch(function(err) {
      //     console.error('error fetching route', vm.routeId);
      //   });
    }

    function updateRoute() {
      console.log('calling updateroute');
      vm.buttonStatus = 'Saving...';
      // Change button status

      // // Submit data
      // RouteFactory.updateRoute(vm.formInfo)
      //   .then(function(res) {

      //   });

      // // Clear form
      // vm.formInfo = {};
    }

    function deleteRoute(argument) {
      RouteFactory.deleteRoute(vm.route);
    }
  }



})();
