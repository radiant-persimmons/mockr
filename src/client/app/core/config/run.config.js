;(function() {

  angular.module('app.core')
    .run(run);

  /* @ngInject */
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart',
                   function(e, toState, toParams, fromState, fromParams) {
      // TODO: do something here
      // sample code below
      //
      // if(toState.authenticate) {
      //   Auth.isAuth()
      //     .success(function(authenticated) {
      //       if (!authenticated) {
      //         e.preventDefault();
      //         window.location = '/login';
      //       }
      //     }).error(function() {
      //       console.error('Error handling authentication');
      //     });
      // }
    });
  }

}).call(this);
