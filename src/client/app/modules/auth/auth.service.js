;(function(){

  function auth($http) {
    this.login = function() {
      window.location = '/api/auth/login';
    };
    return this;
  }

  auth.$inject = ['$http'];

  angular
    .module('app.services.auth',[])
    .factory('auth', auth);

})();
