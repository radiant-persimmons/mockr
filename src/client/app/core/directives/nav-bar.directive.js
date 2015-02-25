;(function(){
  'use strict';

  angular
    .module('app.core')
    .directive('navbar', navbar);

  /* @ngInject */
  function navbar() {
    return {
      template: '<header role="header" id="header"><nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/" ng-hide="vm.loggedIn" class="navbar-brand"><img src="/images/mockr-logo.png"/></a><a href="/home" ng-show="vm.loggedIn" class="navbar-brand">Mockr</a></div><ul class="nav navbar-nav navbar-right"><li ng-hide="vm.loggedIn"><a href="/">Login</a></li><li ng-show="vm.loggedIn"><a>{{ vm.username }}</a></li><li ng-show="vm.loggedIn" class="user-avatar"><a><img ng-src="{{ vm.avatar }}"/></a></li><li ng-show="vm.loggedIn"><a href="#" ng-click="vm.logout()">Logout</a></li></ul></div></nav></header>',
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: 'NavbarController',
      controllerAs: 'vm'
    };

  }
}).call(this);
