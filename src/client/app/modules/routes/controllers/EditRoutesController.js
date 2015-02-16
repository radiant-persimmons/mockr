;(function(){

  function RoutesController () {
    this.addRoute = function(){};
    this.saveRouteBody = function(){};
  }

  RoutesController.$inject = [];

  angular
    .module('app.controllers.RoutesController', ['app.services.RouteFactory'])
    .controller('RoutesController', RoutesController);

})();