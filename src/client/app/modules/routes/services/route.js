;(function(){

  function RouteFactory ($http) {
    this.addRoute = function(body){
      $http({
        method: 'POST',
        data: body
      }).success(function(result) {
        console.log('ADD ROUTE SUCCESS:', result);
      }).error(function(err) {
        console.log('ADD ROUTE ERROR:', err);
      });
    };

    this.updateRoute = function(body){
      $http({
        method: 'PUT',
        data: body
      }).success(function(result) {
        console.log('UPDATE SUCCESS:', result);
      }).error(function(err) {
        console.log('UPDATE ERROR:', err);
      });
    };
  }

  RouteFactory.$inject = ['$http'];

  angular
    .module('app.services.RouteFactory', [])
    .controller('RouteFactory', RouteFactory);

})();