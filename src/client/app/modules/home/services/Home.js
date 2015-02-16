;(function(){

  function HomeFactory ($http) {
    var _this = this;
    this.addRoute = function (route){
      _this.routes.push(route); 
    };
    this.deleteRoute = function (){};
    this.routes = [];
    this.fetch = function(user) {
      $http({
        method: 'GET',
        url: '/api/users/' + user + '/endpoints'
      }).success(function(result) {
        var routes = JSON.parse(result);
        for (var route in routes) {
          _this.routes.push(routes[route]);
        }
      }).error(function(err) {
        console.log('ERROR!!', err);
      });
    };
    return this;
  }

  HomeFactory.$inject = ['$http'];

  angular
    .module('app.services.HomeFactory', [])
    .factory('HomeFactory', HomeFactory);

})();