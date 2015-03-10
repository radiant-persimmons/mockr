;(function() {

  angular.module('app.core')
    .controller('NavbarController', NavbarController);

  /* @ngInject */
  function NavbarController(user, auth) {
    console.log('navbar controller');
    var vm = this;
    vm.avatar = '';
    vm.loggedIn = false;
    vm.username = '';
    vm.login = login;
    vm.logout = logout;

    activate();

    //////////

    function activate() {
      user.registerCb(userResolved);
    }

    function login() {
      auth.login();
    }

    function logout() {
      auth.logout();
    }

    function userResolved() {
      vm.username = user.getUser().username;
      vm.loggedIn = user.loggedIn();
      vm.avatar = user.getUser().avatar;
    }
  }

}).call(this);
