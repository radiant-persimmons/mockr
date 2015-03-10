;(function(){
  'use strict';

  angular
    .module('app.core')
    .directive('navbar', navbar);

  /* @ngInject */
  function navbar() {
    return {
      templateUrl: '/html/core/directives/nav-bar.directive.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: 'NavbarController',
      controllerAs: 'vm'
    };

  }
}).call(this);
