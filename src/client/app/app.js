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
        controllerAs: 'DashBoardCtrl'
      })

    // default uncaught routes to landing page
    $urlRouterProvider.otherwise('/');

    // enable HTML5 mode
    $locationProvider.html5Mode(true);
  }

  config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];



  angular
    .module('app', [
      'mockr-login',
      'mockr-dashboard',
      'ui.router'
    ])
    .config(config);

})();
