;(function(){

  angular
    .module('app.services.auth',[])
    .factory('auth', auth);

  /* @ngInject */
  function auth($window) {

    var service = {
      login: login,
      logout: logout
    };

    return service;

    ////////////

    /**
     * logins user in by directing to server route for passport authentication
     */
    function login() {
      $window.location.replace('/api/auth/login');
    }

    // logout user by directing to server route
    function logout() {
      $window.location.replace('/api/auth/logout');
    }
  }

})();
