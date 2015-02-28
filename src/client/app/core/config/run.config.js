;(function() {

  angular.module('app.core')
    .run(run);

  /* @ngInject */
  function run($rootScope, $state, auth, user) {
    /**
     * every time the state changes, run this check for whether the state
     * requires authentication and, if needed, whether the user is
     * authenticated.
     */
    $rootScope.$on('$stateChangeStart',
                   function(e, toState, toParams, fromState, fromParams) {

      /**
       * only need to check for authentication on states that require it.
       * Then, check that there is not a special flag set to skip the
       * authentication check. This flag is set when the user has been found
       * to be authenticated and needs to retry the route. (This is explained
       * later.)
       */
      if(toState.authenticate && !auth.permitNextStateChange) {
        // Check to see if user is already authenticated
        if (user.loggedIn()) return;

        // Prevent state change from occurring
        e.preventDefault();

        /**
         * User may not seem to be authenticated because it has not resolved
         * its data request from the server. Tell user to execute this function
         * after resolution. (If user is in fact resolved, this will be called
         * immediately.)
         */
        user.registerCb(function() {
          // If user is not logged in, redirect to landing page
          if (!user.loggedIn()) {
            $state.go('landing');

          /**
           * Otherwise, set special flag to bypass this process on the next
           * go-round, preventing an infinite loop. Direct state check to
           * where client originally intended.
           */
          } else {
            auth.permitNextStateChange = true;
            $state.go(toState.name);
          }
        });

      // State doesn't require auth or the special flag was set
      } else {
        // Turn off special flag
        auth.permitNextStateChange = false;
      }

    });
  }

}).call(this);
