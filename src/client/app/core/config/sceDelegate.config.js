;(function() {

  angular.module('app.core')
    .config(config);

  ///////////

  /* @ngInject */
  function config($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin loads
      'self',
      // Allow Heroku app origin
      'http://mockr-hr.herokuapp.com/**'
    ]);
  }

}).call(this);
