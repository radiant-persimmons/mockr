;(function() {

  angular
    .module('app.services.user', [])
    .factory('user', user);

  user.$inject = ['$http'];

  /**
   * Service to store info about the session user. Provides way to register
   * callbacks on factory to be executed after the data requests have been
   * resolved (e.g. a callback to stop a loading animation).
   */
  function user($http) {
    var resolved = false;
    var fnCallbacks = [];
    var sessionUser;
    var factory = {
      getUser: getUser,
      loggedIn: loggedIn,
      registerCb: registerCb
    };

    activate();

    return factory;

    ////////

    function activate() {
      // Get user data from server
      fetchUser().then(function() {
        // After getting info, mark as resolved and run registered callbacks
        resolved = true;
        fnCallbacks.forEach(function(cb) {
          return cb();
        });
      });
    }

    /**
     * returns the currently logged in user
     * @return {Object} current user
     */
    function getUser() {
      return sessionUser;
    }

    /**
     * stores callbacks registered by consumers to be run after service
     * resolves
     * @param  {Function} cb Callback to be run after resolve
     * @return {undefined}  None
     */
    function registerCb(cb) {
      if (typeof cb !== 'function') {
        throw 'user#registerCb: only takes functions as callbacks';
      }

      if (resolved) {
        return cb();
      } else {
        fnCallbacks.push(cb);
        return true;
      }
    }

    function loggedIn() {
      return !!sessionUser && typeof sessionUser.username !== 'undefined';
    }

    /**
     * checks with server to retrieve user object associated with this session.
     * Stores info on private variable `user`.
     * @return {Object} user object
     */
    function fetchUser() {
      return $http.get('/api/user')
        .then(function(res) {
          sessionUser = res.data;
          return sessionUser;
        }).catch(function(err) {
          console.error('Error fetching using:', err);
        });
    }
  }

})();
