;(function(){
  angular.module('app', [
    'ngRoute',
    'mockr-login',
    'mockr-dashboard'
    ])
  .config(function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './core/views/home.jade',
        controller: 'LoginController'
      })
      .when('/login', {
        controller: 'LoginController'
      })
      .when('/dashboard',{
        templateUrl: 'html/core/views/dashboard.html',
        controller: 'DashBoardController'
      });
    $locationProvider.html5Mode = true;
  });
})();
