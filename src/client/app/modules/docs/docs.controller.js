;(function() {
  angular
    .module('app.controllers.DocsController', [])
    .controller('DocsController', DocsController);

    /**
    *
    *
    *
    *
    *
    * @ngInject
    */
    function DocsController() {
      var vm = this;

      vm.docList = ['test', 'server', 'client', 'backend', 'frontend', 'meow'];
      
    };
})();
