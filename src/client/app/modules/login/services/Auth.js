;(function(){

  function AuthFactory($http) {
    this.login = function() {
      window.location = '/api/auth/login';
    };
  }

  AuthFactory.$inject = ['$http'];

  angular
    .module('app.services.AuthFactory',[])
    .factory('AuthFactory', AuthFactory);
    
})();
