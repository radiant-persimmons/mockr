;(function(){

  function AuthFactory($http) {
    this.login = function() {
      console.log('click works');
      $http({
        method: 'GET',
        url: '/login'
      });
    };
    //TODO: do we need this?
    // return {
    //     login: login
    // };
  }

  AuthFactory.$inject = ['$http'];

  angular
    .module('app.services.AuthFactory',[])
    .factory('AuthFactory', AuthFactory);
    
})();
