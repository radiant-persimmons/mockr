;(function(){
  function HomeController($http, HomeFactory) {
    this.formInfo = {};
    this.routes = HomeFactory.routes;
    console.log('in the controller',HomeFactory.routes)
    this.addRoute = function() {
      console.log('in home controller', this.formInfo.route)
      HomeFactory.addRoute(this.formInfo.route);
      this.formInfo.route = '';
    };
    this.editRoute = function() {};
    this.deleteRoute = function() {};
  }

  HomeController.$inject = ['$http', 'HomeFactory'];
  
  angular
    .module('app.controllers.HomeController',['app.services.HomeFactory'])
    .controller('HomeController', HomeController);
})();