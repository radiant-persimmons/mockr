;(function() {
  angular
    .module('app.modules')
    .directive('ngValidat', routeValidation);

    /* @ngInject */
    function routeValidation() {
      var route;
      return {
        restrict: 'C',
        require: '^ngModel',
        // template: '<div>MEOW</div>',
        scope: {
          ngModel: '='
        },
        // controller: ['routes', function(routes) {
        //   routes.fetch().then(function(data){console.log('hi',data);});
        //   console.log('MEOW',routes);
        //   route = routes;
        //   //$scope.routes = rc.route;
        // }],
        link: function(a,b,scope) {
          console.log('hello', scope.ngModel);
          scope.$watch (function(){return scope.ngModel}, function(route) {
            console.log('test',arguments);
            if (route) {
              //logic to validate the route information
              console.log('ROUTE DIRECTIVE', route);
            }
          })
        }
      }
    }
}).call(this);
