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
        templateUrl: '/html/modules/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'vm'
      })

      /**
       * @name home
       * @type {route}
       * @description User landing page, the main display.
       */
      .state('home', {
        url: '',
        abstract: true,
        views: {
          '': {
            templateUrl: 'html/modules/home/template.html'
          },

          'current-routes@home': {
            templateUrl: 'html/modules/layout/current-routes.html',
            controller: 'CurrentRoutesController',
            controllerAs: 'vm'
          },

          'add-routes@home': {
            templateUrl: 'html/modules/layout/add-routes.html',
            controller: 'AddRoutesController',
            controllerAs: 'vm'
          }
        }
      })

      .state('home.home', {
        url: '/home',
        authenticate: true,
        views: {
          'container@home': {
            templateUrl: 'html/modules/home/welcome.html'
          }
        }
      })

      .state('home.new-route', {
        url: '/new-route/:route',
        authenticate: true,
        views: {
          'container@home': {
            templateUrl: 'html/modules/routes/new-route.html',
            controller: 'NewRouteController',
            controllerAs: 'vm'
          }
        }
      })

      /**
       * @name editRoute
       * @type {route}
       * @description View for editing a specific route. Provides options
       *              to edit or delete the route.
       */
      .state('home.edit-route', {
        url: '/routes/{route:.*}',
        authenticate: true,
        views: {
          'container@home': {
            templateUrl: '/html/modules/routes/edit-routes.html',
            controller: 'EditRoutesController',
            controllerAs: 'vm',
          }
        }
      })

      /**
       * @name Docs
       * @type {route}
       * @description View for the project documentation
       *
       */
      .state('docs',{
        url:'',
        abstract: true,
        views: {
          '': {
            templateUrl: '/html/modules/docs/docs.html'
          },
          'doc-list@docs': {
            templateUrl: '/html/modules/docs/docs-list.html',
            controller: 'DocsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('docs.docs', {
        url: '/docs',
        views: {
          'container@docs': {
            templateUrl: '/html/modules/docs/current-doc.html'
          }
        }
      })
      .state('docs.current-doc', {
        url: '/docs/:doc',
        views: {
          'container@docs': {
            templateUrl: function($stateParams) {
              return '/html/modules/docs/pages/' + $stateParams.doc + '.html';
            }
          }
        }
      })

      .state('home.analytics', {
        url: '/analytics/{route:.*}',
        authenticate: true,
        views: {
          'container@home': {
            templateUrl: '/html/modules/analytics/analytics.html',
            controller: 'AnalyticsController',
            controllerAs: 'vm'
          }
        }
      });


    // default uncaught routes to landing page
    $urlRouterProvider.otherwise('/');

    // enable HTML5 mode
    $locationProvider.html5Mode(true);
  }

}).call(this);
