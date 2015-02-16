;(function(){
  function HomeController($http, HomeFactory) {
    this.formInfo = {};
    this.routes = HomeFactory.routes;
    this.addRoute = function() {
      HomeFactory.addRoute(this.formInfo.route);
      this.formInfo.route = '';
    };
    this.editRoute = function() {};
    this.deleteRoute = function() {};
    this.initialize = function() {
      HomeFactory.fetch()
    };
  }

  HomeController.$inject = ['$http', 'HomeFactory'];
  
  angular
    .module('app.controllers.HomeController',['app.services.HomeFactory'])
    .controller('HomeController', HomeController);
})();