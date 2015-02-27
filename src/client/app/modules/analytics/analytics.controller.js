;(function() {

  angular
    .module('app.controllers.AnalyticsController', [])
    .controller('AnalyticsController', AnalyticsController);
  
  /* @ngInject */
  function AnalyticsController($stateParams, user, routes) {
    var vm = this;
  
    // form info regarding this route
    vm.formInfo = {
      route: $stateParams.route,
      methodKeys: [],
      methods: {},
      data: [],
      persistence: false,
      businessLogic: ''
    };

    vm.sortType     = 'id'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchData   = '';     // set the default search/filter term
  

    vm.tableHead = vm.formInfo.data[0];

    activate();


    function activate() {
      // getRoute();
      getRoute().then(function() {
        console.log('route received');
      });
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
          vm.formInfo.persistence = res.persistence;
          vm.formInfo.data = res.data;
          vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
          vm.formInfo.businessLogic = res.businessLogic;
          vm.tableHead = vm.formInfo.data[0];
          return;
        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
          console.error('Message:', err);
        });
    }

  }
}).call(this);