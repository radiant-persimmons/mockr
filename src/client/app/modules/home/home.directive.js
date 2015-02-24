;(function() {
  angular
    .module('app.modules', ['app.controllers.HomeController'])
    .directive('routeValidation', routeValidation);

    /* @ngInject */
    function routeValidation() {
      console.log('scope');
      return {
        restrict: 'C',
        require: '^HomeController',
        scope: {
          HomeController: '='
        },
        // controller: 'HomeController',
        link: function(scope) {
          console.log('hello');
          scope.$watch ('HomeController.formInfo.route', function(route) {
            console.log('test');
            if (route) {
              //logic to validate the route information
              console.log('ROUTE DIRECTIVE', route);
            }
          })
        }
      }
    }
}).call(this);
