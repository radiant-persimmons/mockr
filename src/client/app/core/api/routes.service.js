;(function(){

  angular
    .module('app.services.routes', ['app.services.user'])
    .factory('routes', routes);

  routes.$inject = ['$http', 'user'];

  function routes ($http, user) {
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
        url: '/api/users/' + user.username + '/endpoints',
        data: route
      }).then(function(result) {
        console.log('ADD ROUTE SUCCESS:', result);
      }).catch(function(err) {
        console.log('ADD ROUTE ERROR:', err);
      });

    };

    this.updateRoute = function(body){
      return $http({
        method: 'PUT',
        url: '/api/users/' + user.username + '/endpoints',
        data: body
      }).then(function(result) {
        console.log('UPDATE SUCCESS:', result);
      }).catch(function(err) {
        console.log('UPDATE ERROR:', err);
      });
    };

    this.fetch = function(user) {
      return $http({
        method: 'GET',
        url: '/api/users/' + user.username + '/endpoints',
      }).then(function(result) {
        for (var route in result) {
          _this.routes.push(result[route]);
        }
      }).catch(function(err) {
        console.log('ERROR!!', err);
      });
    };

    return this;
  }

})();
