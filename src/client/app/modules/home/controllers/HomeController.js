;(function(){
  function HomeController($http, RouteFactory) {
    this.formInfo = {};
    this.routes = RouteFactory.routes;

    this.addRoute = function() {
      RouteFactory.addRoute(this.formInfo.route);
      this.formInfo.route = '';
    };

    this.editRoute = function() {};

    this.deleteRoute = function() {
      RouteFactory.deleteRoute();
    };
    
    this.initialize = function() {
      RouteFactory.fetch();
    };
  }

  HomeController.$inject = ['$http', 'RouteFactory'];
  
  angular
    .module('app.controllers.HomeController',['app.services.RouteFactory'])
    .controller('HomeController', HomeController);
})();