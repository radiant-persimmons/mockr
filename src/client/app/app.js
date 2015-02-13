;(function(){
  angular.module('app', ['ngRoute','mockr-login'])
  .config(function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './core/views/home.jade',
        controller: 'LoginController'
      })
      .when('/login', {
        controller: 'LoginController'
      });
    $locationProvider.html5Mode = true;
  });
})();
