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
    vm.logout = logout;

    //////////

    function login() {
      auth.login();
    }

    function logout() {
      auth.logout();
    }

  }

})();
