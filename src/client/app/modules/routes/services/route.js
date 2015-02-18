;(function(){

  function RouteFactory ($http, UserFactory) {
    var _this = this;
    _this.routes = [];

    this.deleteRoute = function (){};

    this.addRoute = function(body){
      var route = {};
      route.method = 'GET';
      route.route = body;
      route.responseStatus = 200;
      this.routes.push(route);
      return $http({
        method: 'POST',
        url: '/api/users/' + UserFactory.username + '/endpoints',
        data: route
      }).success(function(result) {
        console.log('ADD ROUTE SUCCESS:', result);
      }).error(function(err) {
        console.log('ADD ROUTE ERROR:', err);
      });
    };

    this.updateRoute = function(body){
      return $http({
        method: 'PUT',
        url: '/api/users/' + UserFactory.username + '/endpoints',
        data: body
      }).success(function(result) {
        console.log('UPDATE SUCCESS:', result);
      }).error(function(err) {
        console.log('UPDATE ERROR:', err);
      });
    };

    this.fetch = function(user) {
      return $http({
        method: 'GET',
        url: '/api/users/' + UserFactory.username + '/endpoints',
      }).success(function(result) {
        for (var route in result) {
          _this.routes.push(result[route]);
        }
      }).error(function(err) {
        console.log('ERROR!!', err);
      });
    };

    return this;
  }

  RouteFactory.$inject = ['$http', 'UserFactory'];

  angular
    .module('app.services.RouteFactory', ['app.services.User'])
    .factory('RouteFactory', RouteFactory);

})();
