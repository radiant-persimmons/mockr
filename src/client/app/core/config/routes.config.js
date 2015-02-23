;(function() {

  angular.module('app.core')
    .config(config);

  /* @ngInject */
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
        templateUrl: '/html/modules/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      /**
       * @name home
       * @type {route}
       * @description User landing page, the main display.
       */
      // .state('home', {
      //   url: '/home',
      //   templateUrl: '/html/modules/home/home.html',
      //   controller: 'HomeController',
      //   controllerAs: 'vm',
      //   authenticate: true
      // })

      .state('home', {
        url: '/home',
        views: {
          '': {
            templateUrl: 'html/modules/home/template.html'
          },

          'smiles@home': { templateUrl: 'html/modules/home/smiles.html' },

          'myRoutes@home': {
            templateUrl: 'html/modules/home/myroutes.html'
          },

          'addRoutes@home': {
            templateUrl: 'html/modules/home/addroute.html'
          }
        }
      })

      /**
       * @name editRoute
       * @type {route}
       * @description View for editing a specific route. Provides options
       *              to edit or delete the route.
       */
      .state('editRoute', {
        url: '/routes/{route:.*}',
        templateUrl: '/html/modules/routes/edit-routes.html',
        controller: 'EditRoutesController',
        controllerAs: 'vm',
        authenticate: true
      });

    // default uncaught routes to landing page
    $urlRouterProvider.otherwise('/');

    // enable HTML5 mode
    $locationProvider.html5Mode(true);
  }

}).call(this);
