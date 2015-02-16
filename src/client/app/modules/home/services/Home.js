;(function(){

  function HomeFactory () {
    var _this = this;
    this.addRoute = function (route){
      _this.routes.push(route); 
    };
    this.deleteRoute = function (){};
    this.routes = ['/users', '/classes', '/tweets'];
    return this;
  }

  HomeFactory.$inject = [];

  angular
    .module('app.services.HomeFactory', [])
    .factory('HomeFactory', HomeFactory);

})();