;(function() {

  /**
   * Service to store info about the session user. Provides way to register
   * callbacks on factory to be executed after the data requests have been
   * resolved (e.g. a callback to stop a loading animation).
   */
  function UserFactory($http) {
    var resolved = false;
    var fnCallbacks = [];
    var user;
    var factory = {
      getUser: getUser,
      registerCb: registerCb
    };

    // Get user data from server
    fetchUser().then(function() {
      // After getting info, mark as resolved and run registered callbacks
      resolved = true;
      console.log('fetching user', resolved, arguments);
      fnCallbacks.forEach(function(cb) {
        cb();
      });
    });

    return factory;

    ////////

    /**
     * returns the currently logged in user
     * @return {Object} current user
     */
    function getUser() {
      return user;
    }

    /**
     * stores callbacks registered by consumers to be run after service
     * resolves
     * @param  {Function} cb Callback to be run after resolve
     * @return {undefined}  None
     */
    function registerCb(cb) {
      if (resolved) {
        cb();
      } else {
        fnCallbacks.push(cb);
      }
    }

    /**
     * checks with server to retrieve user object associated with this session.
     * Stores info on private variable `user`.
     * @return {Object} user object
     */
    function fetchUser() {
      return $http.get('/api/user')
        .then(function(res) {
          user = res.data;
          console.log('got the user', arguments);
          return user;
        }).catch(function(err) {
          console.error('Error fetching using:', err);
        });
    }
  }

  UserFactory.$inject = ['$http'];

  angular
    .module('app.services.UserFactory', [])
    .factory('UserFactory', UserFactory);
})();
