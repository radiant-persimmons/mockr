;(function() {

  function UserFactory() {
    this.username = 'Andrew';

    return this;
  }

  UserFactory.$inject = [];

  angular
    .module('app.services.User', [])
    .factory('UserFactory', UserFactory);
})();