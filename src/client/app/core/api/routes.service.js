;(function(){

  angular
    .module('app.services.routes', ['app.services.user'])
    .factory('routes', routes);

  routes.$inject = ['$http', 'user'];

  function routes ($http, user) {
    var vm = this;
    vm = {
      routes: [],
      addRoute: addRoute,
      updateRoute: updateRoute,
      fetch: fetch
    };

    return vm; 

    function deleteRoute(){}

    function addRoute(body, username){
      console.log(body);
      console.log(vm);
      var route = {
        username: username,
        route: body.route,
        methods: {

        },
        headers: '',
        body: {}
      };
      console.log('routes',vm.routes);

      vm.routes.push(body.route);
      console.log('routes',vm.routes);
      return $http({
        method: 'POST',
        url: '/api/users/' + username + '/endpoints',
        data: route
      }).success(function(result) {
        console.log('ADD ROUTE SUCCESS:', result);
      }).error(function(err) {
        console.log('ADD ROUTE ERROR:', err);
      });
    }

    function updateRoute(body){
      return $http({
        method: 'PUT',
        url: '/api/users/' + user.username + '/endpoints',
        data: body
      }).then(function(result) {
        console.log('UPDATE SUCCESS:', result);
      }).catch(function(err) {
        console.log('UPDATE ERROR:', err);
      });
    }

    function fetch(user) {
      return $http({
        method: 'GET',
        url: '/api/users/' + user + '/endpoints',
      }).then(function(result) {
        var routes = arguments[0].data;
        vm.routes.length = 0;
        for (var route in routes) {
          vm.routes.push(routes[route].route);
        }
      }).catch(function(err) {
        console.log('ERROR!!', err);
      });
    }

  }

})();
