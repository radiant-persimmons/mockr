;(function(){

  function config($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
      /**
       * @name landing
       * @type {route}
       * @description First page for incoming users, and for default routing
       *              for all failed routes.
       */
      .state('landing', {
        url: '/',
        templateUrl: '/core/views/home.html',
        controller: 'LandingController',
        controllerAs: 'LandingCtrl'
      })

      /**
       * @name dashboard
       * @type {route}
       * @description User landing page, the main display.
       */
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/html/core/views/dashboard.html',
        controller: 'DashBoardController',
        controllerAs: 'DashBoardCtrl',
        authenticate: true
       });

    // default uncaught routes to landing page
    $urlRouterProvider.otherwise('/');

    // enable HTML5 mode
    $locationProvider.html5Mode(true);
  }

  config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart',
                   function(e, toState, toParams, fromState, fromParams) {
      // TODO: do something here
      // sample code below
      //
      // if(toState.authenticate) {
      //   Auth.isAuth()
      //     .success(function(authenticated) {
      //       if (!authenticated) {
      //         e.preventDefault();
      //         window.location = '/login';
      //       }
      //     }).error(function() {
      //       console.error('Error handling authentication');
      //     });
      // }
    });
  }

  run.$inject = ['$rootScope', '$state'];

  angular
    .module('app', [
      'mockr-login',
      'mockr-dashboard',
      'ui.router'
    ])
    .config(config)
    .run(run);


})();
