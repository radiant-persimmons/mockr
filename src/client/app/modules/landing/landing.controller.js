;(function() {

  angular
    .module('app.controllers.LandingController', [])
    .controller('LandingController', LandingController);

  /* @ngInject */
  function LandingController(auth) {
    var vm = this;


     function getStartedLogin(){
        auth.login();
     }
     vm.getStartedLogin = getStartedLogin;
  }

}).call(this);
