;(function(){

  angular
    .module('app.controllers.LoginController', [
      'app.services.auth'
    ])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['auth'];

  function LoginController(auth) {
    this.login = function() {
      auth.login();
    };

  }

})();
