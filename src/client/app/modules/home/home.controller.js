;(function(){
  /**
  * the home controller is responsible for displaying the info on the main page of the app
  * It stores and displays data on what routes the user has available to them 
  * This page serves as a jumping off point to editing individual routes and makes 
  * adding and removing new routes easy
  */

  function HomeController($http, RouteFactory, UserFactory, checklist) {
    var test;
    this.formInfo = {};
    this.formInfo.verbs = [];
    this.routes = RouteFactory.routes;
    this.verbs = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

    /**
    * Activate gets called on module load and calls fetch which fetches user data
    * from the database and displays it for the user
    */
    this.activate = function() {
      UserFactory.registerCb(function(){
        test = this.getUser();
      });
      console.log('getting user', test);
      RouteFactory.fetch();
    };

    /**
    * Process to capture and add route information from the user then store them in 
    * the database
    */
    this.addRoute = function() {
      console.log(this.formInfo);
      RouteFactory.addRoute(this.formInfo);
      this.formInfo.route = '';
    };

    this.editRoute = function() {};

    this.deleteRoute = function() {
      RouteFactory.deleteRoute();
    };

    //runs activate on startup
    this.activate();
  }

  HomeController.$inject = [
    '$http', 
    'RouteFactory', 
    'UserFactory'
  ];

  angular
    .module('app.controllers.HomeController', [
      'app.services.RouteFactory',
      'app.services.UserFactory',
      'checklist-model'
    ])
    .controller('HomeController', HomeController);
})();
