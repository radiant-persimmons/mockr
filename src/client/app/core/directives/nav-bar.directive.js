;(function(){
  'use strict';

  angular
    .module('app.core')
    .directive('navbar', navbar);

  /* @ngInject */
  function navbar() {
    return {
      template: '<header role="header" id="header"><nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/" class="navbar-brand">Mockr</a></div><ul class="nav navbar-nav navbar-right"><li ng-hide="vm.loggedIn"><a href="/login">Login</a></li><li ng-hide="vm.loggedIn"><a href="/signup">Signup</a></li><li ng-show="vm.loggedIn"><a>{{ vm.username }}</a></li><li ng-show="vm.loggedIn" class="user-avatar"><a><img ng-src="{{ vm.avatar }}"/></a></li><li ng-show="vm.loggedIn"><a href="#" ng-click="vm.logout()">Logout</a></li></ul></div></nav></header>',
      restrict: 'E',
      scope: true,
      transclude: true,
      controller: 'NavbarController',
      controllerAs: 'vm'
    };

  }

  /** jade template source

  header(role="header" id="header")
    //- nav.navbar.navbar-inverse.navbar-fixed-top
    nav.navbar.navbar-inverse
      .container-fluid
        .navbar-header
          button(type="button" class="navbar-toggle collapsed")
            span.icon-bar
            span.icon-bar
            span.icon-bar
          a(class="navbar-brand" href="/") Mockr
        ul(class="nav navbar-nav navbar-right")
          li(ng-hide="vm.loggedIn")
            a(href="/login") Login
          li(ng-hide="vm.loggedIn")
            a(href="/signup") Signup
          li(ng-show="vm.loggedIn")
            a {{ vm.username }}
          li.user-avatar(ng-show="vm.loggedIn")
            a
              img(ng-src="{{ vm.avatar }}")
          li(ng-show="vm.loggedIn")
            a(href="#" ng-click="vm.logout()") Logout

  */
}).call(this);
