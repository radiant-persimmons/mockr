;(function(){
  angular
    .module('LoginFactory',[])
    .factory('GithubLogin',['$http', function($http){
      var login = function(){
        console.log('click works');
        $http({
          method: 'GET',
          url: '/login'
        });
      };

      return {
        login: login
      };
    }]);
})();