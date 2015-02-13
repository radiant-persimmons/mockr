;(function(){
  angular
    .module('mockr-login', ['LoginFactory'])
    .controller('LoginController',['$scope', '$http', 'GithubLogin', function ($scope, $http, $GithubLogin) {
      $scope.login = function(){
        $GithubLogin.login();
      };
    }]);
})();