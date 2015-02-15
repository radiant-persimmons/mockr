;(function(){

  function LoginController(AuthFactory) {
    this.login = function() {
      AuthFactory.login();
    };

  }

  LoginController.$inject = ['AuthFactory'];

  angular
    .module('app.controllers.LoginController', [
      'app.services.AuthFactory'
    ])
    .controller('LoginController', LoginController);



})();
