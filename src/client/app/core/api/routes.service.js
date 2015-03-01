;(function(){

  angular
    .module('app.services.routes', ['app.services.user'])
    .factory('routes', routes);

  routes.$inject = ['$http', 'user'];

  function routes ($http, user) {
    var service = {
      routes: [],
      addRoute: addRoute,
      deleteRoute: deleteRoute,
      getRoute: getRoute,
      updateRoute: updateRoute,
      fetch: fetch
    };

    return service;

  ////////////////////////////////////


    /**
     * deletes specified route from server
     */
    function deleteRoute(route){
      return $http({
        method: 'DELETE',
        url: '/api/users/' + user.getUser().username + '/endpoints/' + route,
      }).then(function(res) {
        service.routes = _.filter(service.routes, function(e) { return e !== route; });
      }).catch(function(res) {
        console.error('Error deleting route', res);
      });
    }


    /**
    * adds a route to the database
    * @param {Object} body Data sent about one route including http verbs
    * @param {string} username Username for the logged in user
    * @return {promise} $http returns a promise to be used later
    */
    function addRoute(body){

      return $http({
        method: 'POST',
        url: '/api/users/' + user.getUser().username + '/endpoints',
        data: body
      }).then(function(results) {
        console.log('SUCCESS', results);
        // store route in data store
        service.routes.push(body.route);
      })
      .catch(function(err){
        console.log('ERROR', err);
      });
    }

    //TODO this needs fixed
    function updateRoute(body){
      return $http({
        method: 'PUT',
        url: '/api/users/' + user.getUser().username + '/endpoints/' + body.route,
        data: body
      }).then(function(result) {
        console.log('UPDATE SUCCESS:', result);
      }).catch(function(err) {
        console.log('UPDATE ERROR:', err);
      });
    }


    /**
    * fetches the users active routes from the database and stores the for display
    * @param {string} user Username for the logged in user
    */
    function fetch(user) {
      return $http({
        method: 'GET',
        url: '/api/users/' + user + '/endpoints',
      }).then(function(result) {
        service.routes.length = 0;
        for (var route in result.data) {
          service.routes.push(result.data[route].route);
        }
      }).catch(function(err) {
        console.log('ERROR!!', err);
      });
    }

    function getRoute(route) {
      console.log('inside routes service');
      console.log(user.getUser().username, route);
      return $http({
        method: 'GET',
        url: '/api/users/' + user.getUser().username + '/endpoints/' + route
      }).then(function(result) {
        console.log('result from routes.getRoute', result);
        return result.data;
        //for (var route in result) {
          //_this.routes.push(result[route]);
        //}
      }).catch(function(err) {
        console.log('ERROR!!', err);
      });
    }

  }

})();
