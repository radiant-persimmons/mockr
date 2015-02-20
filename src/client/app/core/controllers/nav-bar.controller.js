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
      console.log(vm.loggedIn);
      user.registerCb(userResolved);
    }

    // function loggedIn() {
    //   console.log(user.loggedIn());
    //   return user.loggedIn();
    // }

    function userResolved() {
      vm.username = user.getUser().username;
      vm.loggedIn = user.loggedIn();
      // console.log(vm.loggedIn());
    }
  }

}).call(this);
