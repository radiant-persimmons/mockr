;(function(){

  function EditRoutesController () {
    this.addRoute = function(){};
    this.saveRouteBody = function(){};
  }

  EditRoutesController.$inject = [];

  angular
    .module('app.controllers.EditRoutesController', ['app.services.EditRouteFactory'])
    .controller('EditRoutesController', EditRoutesController);

})();