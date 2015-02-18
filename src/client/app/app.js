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
        templateUrl: '/html/modules/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'LandingCtrl'
      })

      /**
       * @name home
       * @type {route}
       * @description User landing page, the main display.
       */
      .state('home', {
        url: '/home',
        templateUrl: '/html/modules/home/home.html',
        controller: 'HomeController',
        controllerAs: 'HomeCtrl',
        authenticate: true
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


/**
 *  resolve: {
        screenshots: function($stateParams, Screenshot) {
          return Screenshot.getScreenshots($stateParams.username)
            .then(function(screenshots){
              return screenshots.data;
            }).catch(function(err) {
              console.error('Error getting screenshots: ', err);
            });
        }
      }
 */


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
      'app.controllers.EditRoutesController',
      'app.controllers.HomeController',
      'app.controllers.LoginController',
      'ui.router'
    ])
    .config(config)
    .run(run);
})();
