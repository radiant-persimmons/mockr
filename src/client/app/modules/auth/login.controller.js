;(function(){

  angular
    .module('app.controllers.LoginController', [
      'app.services.auth'
    ])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['auth'];

  function LoginController(auth) {
    var vm = this;
    vm.login = login;

    //////////

    function login() {
      auth.login();
    }

  }

})();
