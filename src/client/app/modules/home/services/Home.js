;(function(){

  function HomeFactory () {
    this.addRoute = function (){};
    this.deleteRoute = function (){};

  }

  HomeFactory.$inject = [];

  angular
    .module('app.services.HomeFactory', [])
    .controller('HomeFactory', HomeFactory);

})();