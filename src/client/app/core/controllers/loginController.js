;(function(){
  angular
    .module('mockr-login', ['LoginFactory'])
    .controller('LoginController',['$scope', '$location', 'GithubLogin', function ($scope, $location, GithubLogin) {
      $scope.login = function(){
        GithubLogin.login();
      };
      $scope.redir = function(){
        $location.path('/dashboard');
      };
    }]);
})();




;(function(){

  function LoginController($location, GithubLogin) {
  // function a(b, c) {

  }

    this.login = function() {
      GithubLogin.login();
    };

  }

  LoginController.$inject = ['$location', 'GithubLogin'];

  angular
    .module('app.controllers.loginController', [
      'LoginFactory'
    ])
    .controller('LoginController', LoginController);



// })();

/*

core/

modules/
  rooms/
  messages/
  users/
    api/
    controllers/
    directives/
    views/

*/