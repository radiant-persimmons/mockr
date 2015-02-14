;(function(){
  function HomeController() {
    this.addRoute = function() {};
    this.editRoute = function() {};
    this.deleteRoute = function() {};
  }

  HomeController.$inject = ['$http'];
  
  angular
    .module('app.controllers.HomeController',['app.services.HomeFactory'])
    .controller('HomeController', HomeController);
})();