;(function(){

  function EditRouteFactory () {
    this.addRoute = function(){};
    this.saveRouteBody = function(){};
  }

  EditRouteFactory.$inject = [];

  angular
    .module('app.services.EditRouteFactory', [])
    .controller('EditRouteFactory', EditRouteFactory);

})();