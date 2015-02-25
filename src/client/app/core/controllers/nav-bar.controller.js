;(function() {

  angular.module('app.core')
    .controller('NavbarController', NavbarController);

  /* @ngInject */
  function NavbarController(user) {
    var vm = this;
    vm.avatar = '';
    vm.loggedIn = false;
    vm.username = '';

    activate();

    //////////

    function activate() {
      user.registerCb(userResolved);
    }

    function userResolved() {
      vm.username = user.getUser().username;
      vm.loggedIn = user.loggedIn();
      vm.avatar = user.getUser().avatar;
    }
  }

}).call(this);
