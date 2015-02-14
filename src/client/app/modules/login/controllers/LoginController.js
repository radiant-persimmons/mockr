;(function(){

  function LoginController(AuthFactory) {

    this.login = function() {
      AuthFactory.login();
    };

  }

  LoginController.$inject = ['AuthFactory'];

  angular
    .module('app.controllers.LoginController', [
      'AuthFactory'
    ])
    .controller('LoginController', LoginController);



})();

/*

core/

modules/
  rooms/
  messages/
  users/
    api/
    controllers/
    directives/
    views/

*/