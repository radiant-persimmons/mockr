;(function(){
  'use strict';

  angular
    .module('app.modules')
    .directive('charts', charts);

  /* @ngInject */
  function charts() {

    return {
      templateUrl: '/html/modules/analytics/chart.directive.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: 'AnalyticsController',
      controllerAs: 'vm'
    };

  }
}).call(this);
