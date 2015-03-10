;(function(){
  'use strict';

  angular
    .module('app.directives.test', [])
    .directive('navbarTest', navbarTest);

  /* @ngInject */
  function navbarTest() {
    return {
      template: '<h1>Hello {{vm.name}}</h1>',
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: 'TestController',
      controllerAs: 'vm'
    };

  }
}).call(this);
