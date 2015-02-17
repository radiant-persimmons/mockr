;(function(){
  function HomeController($http, RouteFactory, UserFactory) {
    this.formInfo = {};
    this.routes = RouteFactory.routes;

    this.addRoute = function() {
      RouteFactory.addRoute(this.formInfo.route);
      this.formInfo.route = '';
    };

    this.editRoute = function() {};

    this.deleteRoute = function() {
      RouteFactory.deleteRoute();
    };

  }

  HomeController.$inject = ['$http', 'RouteFactory', 'UserFactory'];

  angular
    .module('app.controllers.HomeController', [
      'app.services.RouteFactory',
      'app.services.UserFactory'
    ])
    .controller('HomeController', HomeController);
})();
>>>>>>> user service complete
