;(function(){
  function HomeController() {
    this.addRoute = function() {};
    this.editRoute = function() {};
    this.deleteRoute = function() {};
  }

  HomeController.$inject = ['$http'];
  
  angular
    .module('app.controller.Home',[])
    .controller('HomeController', HomeController);
})();